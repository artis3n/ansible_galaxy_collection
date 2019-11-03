const core = require('@actions/core');
const exec = require('@actions/exec');
const yaml = require('js-yaml');
const fs = require('fs');

try {
    const apiKey = core.getInput('api_key', { required: true });
    const galaxy_config_file = core.getInput('galaxy_config_file') || 'galaxy.yml';
    const galaxy_config = yaml.safeLoad(fs.readFileSync(galaxy_config_file, 'utf8'));

    const collection = new AnsibleCollection(galaxy_config.namespace, galaxy_config.name, galaxy_config.version);

    core.debug(`Building collection ${collection.title}`);
    buildCollection(collection, apiKey)
        .then(() => {})
        .catch(err => core.setFailed(err.message));
} catch (error) {
    core.setFailed(error.message);
}

async function buildCollection(collection, apiKey) {
    await exec.exec('ansible-galaxy collection build');
    await exec.exec(`ansible-galaxy collection publish ${collection.title}.tar.gz --api-key=${apiKey}`)
}

class AnsibleCollection {
    constructor(namespace, name, version) {
        this.namespace = this._validateParam(namespace);
        this.name = this._validateParam(name);
        this.version = this._validateParam(version);
    }

    get title() {
        return `${this.namespace}-${this.name}-${this.version}`;
    }

    _validateParam(param) {
        if (param !== undefined) {
            return param;
        }
        core.error("galaxy.yml is missing required namespace, name, or version parameter.");
        throw new Error("Missing required parameters in galaxy.yml");
    }
}
