import { debug as coreDebug, error as coreError, getInput, setFailed } from '@actions/core';
import { which } from '@actions/io';
import { exec } from '@actions/exec';
import { safeLoad } from 'js-yaml';
import { readFileSync } from 'fs';

import { GalaxyConfig } from './types';

try {
  const apiKey = getInput('api_key', { required: true });
  const galaxy_config_file = getInput('galaxy_config_file') || 'galaxy.yml';
  const galaxy_config: GalaxyConfig = safeLoad(readFileSync(galaxy_config_file, 'utf8'));

  const namespace = galaxy_config.namespace;
  const name = galaxy_config.name;
  const version = galaxy_config.version;

  if (namespace === undefined || name === undefined || version === undefined) {
    const error = new Error('Missing require namespace, name, or version fields in galaxy.yml');
    coreError(error.message);
    setFailed(error.message);
  } else {
    coreDebug(`Building collection ${namespace}-${name}-${version}`);
    buildCollection(namespace, name, version, apiKey)
      .then(() =>
        coreDebug(`Successfully published ${namespace}-${name} v${version} to Ansible Galaxy.`),
      )
      .catch(err => setFailed(err.message));
  }
} catch (error) {
  setFailed(error.message);
}

async function buildCollection(namespace: string, name: string, version: number, apiKey: string) {
  const galaxyCommandPath = await which('ansible-galaxy', true);
  await exec(`${galaxyCommandPath} collection build`);
  await exec(
    `${galaxyCommandPath} collection publish ${namespace}-${name}-${version}.tar.gz --api-key=${apiKey}`,
  );
}
