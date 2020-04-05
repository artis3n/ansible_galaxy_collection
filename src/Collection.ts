import { IsNotEmpty } from 'class-validator';
import { ExecOptions } from '@actions/exec/lib/interfaces';

import { GalaxyConfig } from './types';
import { IsSemver } from './decorators';

export class Collection {
  @IsNotEmpty()
  namespace: string;
  @IsNotEmpty()
  name: string;
  @IsSemver({ message: '$value must be semver-compatible' })
  @IsNotEmpty()
  version: string = '';
  @IsNotEmpty()
  readonly apiKey: string;

  constructor(config: GalaxyConfig, apiKey: string) {
    this.namespace = config.namespace || '';
    this.name = config.name || '';
    this.version = config.version || '';
    this.apiKey = apiKey;
  }

  toString() {
    return `${this.namespace}-${this.name}-${this.version}`;
  }

  /**
   * Publishes a Collection to Ansible Galaxy.
   * @param which
   * @param exec
   */
  async publish(
    which: (tool: string, check?: boolean | undefined) => Promise<string>,
    exec: (commandLine: string, args?: string[], options?: ExecOptions) => Promise<number>,
  ): Promise<number> {
    const galaxyCommandPath = await which('ansible-galaxy', true);
    await exec(`${galaxyCommandPath} collection build`);
    return exec(`${galaxyCommandPath} collection publish ${this}.tar.gz --api-key=${this.apiKey}`);
  }
}
