import { valid } from 'semver';
import { GalaxyConfigFile } from './types';
import { safeDump } from 'js-yaml';
import { writeFileSync } from 'fs';

/**
 * Represents the contents of a galaxy.yml Ansible Galaxy config file.
 */
export class GalaxyConfig {
  protected config: GalaxyConfigFile;
  protected changes: boolean = false;

  constructor(config: GalaxyConfigFile) {
    this.config = config;
  }

  get namespace() {
    return this.config.namespace;
  }

  get name() {
    return this.config.name;
  }

  get version() {
    return this.config.version;
  }

  set version(input: string | undefined) {
    if (valid(input)) {
      this.config.version = input;
      this.changes = true;
    }
  }

  /**
   * Writes this config back into its original file if changes have occurred to its contents.
   */
  commit(filePath: string) {
    if (this.changes) {
      const yamlAsString = safeDump(this.config);
      writeFileSync(filePath, yamlAsString, 'utf8');
    }
  }
}
