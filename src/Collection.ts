import { IsNotEmpty } from 'class-validator';
import { ExecOptions } from '@actions/exec/lib/interfaces';

import { CollectionInput } from './types';
import { IsSemver } from './decorators';
import { GalaxyConfig } from './GalaxyConfig';

/**
 * An Ansible Galaxy Collection.
 */
export class Collection {
  // Keep these parameters in this class, not passed through to the GalaxyConfig, to avoid tight class coupling.
  // Also, we can perform class-validator validations on the inputs this way.
  @IsNotEmpty()
  namespace: string;
  @IsNotEmpty()
  name: string;
  @IsSemver({ message: '$value must be semver-compatible' })
  @IsNotEmpty()
  version: string;
  protected readonly customDir: string;
  @IsNotEmpty()
  readonly apiKey: string;
  protected readonly config: GalaxyConfig;

  /**
   * Validation of input is handled by decorators.
   */
  constructor({ config, apiKey, customDir, customVersion }: CollectionInput) {
    this.config = config;

    this.namespace = config.namespace || '';
    this.name = config.name || '';
    this.version = this.applyCustomVersion(customVersion);
    this.apiKey = apiKey;
    this.customDir = customDir;
  }

  toString() {
    return `${this.namespace}-${this.name}-${this.version}`;
  }

  get path() {
    if (this.customDir.length > 0) {
      return this.customDir;
    }
    return '';
  }

  protected applyCustomVersion(customVersion: string | undefined): string {
    let version = this.config.version;
    if (customVersion !== '') {
      version = customVersion;
      this.config.version = version;
    }

    return version || '';
  }

  /**
   * Builds a Collection in preparation for submission to Ansible Galaxy.
   * @param which Either which from @actions/io or an injected stub for testing
   * @param exec Either exec from @actions/exec or an injected stub for testing
   */
  async build(
    which: (tool: string, check?: boolean | undefined) => Promise<string>,
    exec: (commandLine: string, args?: string[], options?: ExecOptions) => Promise<number>,
  ): Promise<number> {
    const galaxyCommandPath = await which('ansible-galaxy', true);
    // If a custom directory is passed in, use that. Otherwise, do not specify a custom location.
    return exec(`${galaxyCommandPath} collection build ${this.path}`);
  }

  /**
   * Publishes a Collection to Ansible Galaxy.
   * @param which Either which from @actions/io or an injected stub for testing
   * @param exec Either exec from @actions/exec or an injected stub for testing
   */
  async publish(
    which: (tool: string, check?: boolean | undefined) => Promise<string>,
    exec: (commandLine: string, args?: string[], options?: ExecOptions) => Promise<number>,
  ): Promise<number> {
    const galaxyCommandPath = await which('ansible-galaxy', true);
    // If a custom directory is passed in, use that. Otherwise, do not specify a custom location.
    return exec(`${galaxyCommandPath} collection publish ${this}.tar.gz --api-key=${this.apiKey}`);
  }
}
