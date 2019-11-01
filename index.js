const core = require('@actions/core');
const exec = require('@actions/exec');
const yaml = require('js-yaml');
const fs = require('fs');

try {
    const apiKey = core.getInput('api_key');
    const galaxy_config_file = core.getInput('galaxy_config_file') || 'galaxy.yml';
    const galaxy_config = yaml.safeLoad(fs.readFileSync(galaxy_config_file, 'utf8'));

    const namespace = galaxy_config.namespace;
    const name = galaxy_config.name;
    const version = galaxy_config.version;

    console.log(`Building collection ${namespace}-${name}, version ${version}`);
    buildCollection(namespace, name, version, apiKey)
        .then(() => { })
        .catch(err => core.setFailed(err.message));
} catch (error) {
    core.setFailed(error.message);
}

async function buildCollection(namespace, name, version, apiKey) {
    await exec.exec('ansible-galaxy collection build');
    await exec.exec(`ansible-galaxy collection publish ${namespace}-${name}-${version}.tar.gz --api-key=${apiKey}`)
}
