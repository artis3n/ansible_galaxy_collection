import { IsNotEmpty } from 'class-validator';
import { ExecOptions } from '@actions/exec/lib/interfaces';

import { GalaxyConfig } from './types';
import { IsSemver } from './decorators';

/**
 * An Ansible Galaxy Collection.
 */
export class Collection {
  @IsNotEmpty()
  namespace: string;
  @IsNotEmpty()
  name: string;
  @IsSemver({ message: '$value must be semver-compatible' })
  @IsNotEmpty()
  version: string;
  private readonly customDir?: string;
  @IsNotEmpty()
  readonly apiKey: string;

  /**
   * Validation of input is handled by decorators.
   */
  constructor(config: GalaxyConfig, apiKey: string, customDir?: string) {
    this.namespace = config.namespace || '';
    this.name = config.name || '';
    this.version = config.version || '';
    this.apiKey = apiKey;
    this.customDir = customDir;
  }

  toString() {
    return `${this.namespace}-${this.name}-${this.version}`;
  }

  get path() {
    if (this.customDir && this.customDir.length > 0) {
      return this.customDir;
    }
    return '';
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
    await exec(`${galaxyCommandPath} collection build ${this.path}`);
    return exec(`${galaxyCommandPath} collection publish ${this}.tar.gz --api-key=${this.apiKey}`);
  }
}
