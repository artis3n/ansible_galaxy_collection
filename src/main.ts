import { debug as coreDebug, error as coreError, getInput, setFailed } from '@actions/core';
import { which } from '@actions/io';
import { exec } from '@actions/exec';

import { Collection } from './Collection';
import { ExitCodes } from './enums';
import { validateSync } from 'class-validator';
import { join } from 'path';
import { GalaxyConfig } from './GalaxyConfig';
import { load as yamlLoad } from 'js-yaml';
import { readFileSync } from 'fs';
import { GalaxyConfigFile } from './types';

try {
  const apiKey = getInput('api_key', { required: true });
  const collectionLocation: string = getInput('collection_dir');
  // Will always be a string, but may be an empty string if the parameter is not defined
  const maybeGalaxyVersion = getInput('galaxy_version');
  /**
   * @deprecated You probably want 'collection_dir,' not this parameter.
   */
  const galaxyConfigFile = getInput('galaxy_config_file');

  const [galaxyConfigResolvedPath, galaxyConfig] = prepareConfig(galaxyConfigFile, collectionLocation);
  let collection: Collection;
  try {
    collection = new Collection({
      config: galaxyConfig,
      apiKey,
      customDir: collectionLocation,
      customVersion: maybeGalaxyVersion,
    });
  } catch (err) {
    setFailed(err);
    process.exit(ExitCodes.ValidationFailed);
  }

  const validationErrors = validateSync(collection);
  if (validationErrors.length > 0) {
    const errorMessages = validationErrors.map(error => error.constraints);
    errorMessages.forEach(error => coreError(JSON.stringify(error)));
    setFailed('This action encountered validation failures. Inspect the output for all validation errors.');
    process.exit(ExitCodes.ValidationFailed);
  }

  coreDebug(`Building collection ${collection}`);
  galaxyConfig.commit(galaxyConfigResolvedPath);
  collection
    .publish(which, exec)
    .then(() => coreDebug(`Successfully published ${collection} to Ansible Galaxy.`))
    .catch(({ message }: Error) => {
      setFailed(message);
      process.exit(ExitCodes.DeployFailed);
    });
} catch (error) {
  setFailed(error.message);
}

function prepareConfig(configFileName: string, collectionLocation: string): [string, GalaxyConfig] {
  let galaxyConfigFilePath = configFileName;
  if (collectionLocation.length > 0) {
    galaxyConfigFilePath = join(collectionLocation, configFileName);
  }
  coreDebug(`Using galaxy config file locate at: ${galaxyConfigFilePath}`);

  try {
    const configContent: GalaxyConfigFile = yamlLoad(readFileSync(galaxyConfigFilePath, 'utf8')) as GalaxyConfigFile;
    return [galaxyConfigFilePath, new GalaxyConfig(configContent)];
  } catch(e) {
    setFailed(`Was unable to read the galaxy.yml file at path: ${galaxyConfigFilePath}`)
    throw e
  }

}
