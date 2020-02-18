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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const exec_1 = require("@actions/exec");
const js_yaml_1 = require("js-yaml");
const fs_1 = require("fs");
try {
    const apiKey = core_1.getInput('api_key', { required: true });
    const galaxy_config_file = core_1.getInput('galaxy_config_file') || 'galaxy.yml';
    const galaxy_config = js_yaml_1.safeLoad(fs_1.readFileSync(galaxy_config_file, 'utf8'));
    const namespace = galaxy_config.namespace;
    const name = galaxy_config.name;
    const version = galaxy_config.version;
    if (namespace === undefined || name === undefined || version === undefined) {
        const error = new Error('Missing require namespace, name, or version fields in galaxy.yml');
        core_1.error(error.message);
        core_1.setFailed(error.message);
    }
    else {
        core_1.debug(`Building collection ${namespace}-${name}-${version}`);
        buildCollection(namespace, name, version, apiKey)
            .then(() => core_1.debug(`Successfully published ${namespace}-${name} v${version} to Ansible Galaxy.`))
            .catch(err => core_1.setFailed(err.message));
    }
}
catch (error) {
    core_1.setFailed(error.message);
}
function buildCollection(namespace, name, version, apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exec_1.exec('ansible-galaxy collection build');
        yield exec_1.exec(`ansible-galaxy collection publish ${namespace}-${name}-${version}.tar.gz --api-key=${apiKey}`);
    });
}
