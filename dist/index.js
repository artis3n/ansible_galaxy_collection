"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
}
catch (error) {
    core.setFailed(error.message);
}
function buildCollection(namespace, name, version, apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exec.exec('ansible-galaxy collection build');
        yield exec.exec(`ansible-galaxy collection publish ${namespace}-${name}-${version}.tar.gz --api-key=${apiKey}`);
    });
}
