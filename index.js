const core = require('@actions/core');
const exec = require('@actions/exec');
const yaml = require('js-yaml');
const fs = require('fs');

try {
    const apiKey = core.getInput('api_key', { required: true });
    const galaxy_config_file = core.getInput('galaxy_config_file') || 'galaxy.yml';
    const galaxy_config = yaml.safeLoad(fs.readFileSync(galaxy_config_file, 'utf8'));

    const namespace = galaxy_config.namespace;
    const name = galaxy_config.name;
    const version = galaxy_config.version;

    if (namespace === undefined || name === undefined || version === undefined) {
        const error = new Error("Missing require namespace, name, or version fields in galaxy.yml");
        core.error(error.message);
        core.setFailed(error.message);
    }

    core.debug(`Building collection ${namespace}-${name}-${version}`);
    buildCollection(namespace, name, version, apiKey)
        .then(() => core.debug(`Successfully published ${namespace}-${name} v${version} to Ansible Galaxy.`))
        .catch(err => core.setFailed(err.message));
} catch (error) {
    core.setFailed(error.message);
}

async function buildCollection(namespace, name, version, apiKey) {
    await exec.exec('ansible-galaxy collection build');
    await exec.exec(`ansible-galaxy collection publish ${namespace}-${name}-${version}.tar.gz --api-key=${apiKey}`)
}
