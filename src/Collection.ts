import { IsNotEmpty } from 'class-validator';
import { which } from '@actions/io';
import { exec } from '@actions/exec';

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

  async build() {
    const galaxyCommandPath = await which('ansible-galaxy', true);
    await exec(`${galaxyCommandPath} collection build`);
    await exec(`${galaxyCommandPath} collection publish ${this}.tar.gz --api-key=${this.apiKey}`);
  }
}
