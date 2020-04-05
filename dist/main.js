"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const js_yaml_1 = require("js-yaml");
const fs_1 = require("fs");
const io_1 = require("@actions/io");
const exec_1 = require("@actions/exec");
const Collection_1 = require("./Collection");
const enums_1 = require("./enums");
const class_validator_1 = require("class-validator");
try {
    const apiKey = core_1.getInput('api_key', { required: true });
    const galaxyConfigFile = core_1.getInput('galaxy_config_file');
    const collectionLocation = core_1.getInput('collection_dir');
    const galaxyConfig = js_yaml_1.safeLoad(fs_1.readFileSync(galaxyConfigFile, 'utf8'));
    const collection = new Collection_1.Collection(galaxyConfig, apiKey, collectionLocation);
    const validationErrors = class_validator_1.validateSync(collection);
    if (validationErrors.length > 0) {
        const errorMessages = validationErrors.map(error => error.constraints);
        errorMessages.forEach(error => core_1.error(JSON.stringify(error)));
        core_1.setFailed('This action encountered validation failures. Inspect the output for all validation errors.');
        process.exit(enums_1.ExitCodes.ValidationFailed);
    }
    core_1.debug(`Building collection ${collection}`);
    collection
        .publish(io_1.which, exec_1.exec)
        .then(() => core_1.debug(`Successfully published ${collection} to Ansible Galaxy.`))
        .catch(({ message }) => {
        core_1.setFailed(message);
        process.exit(enums_1.ExitCodes.DeployFailed);
    });
}
catch (error) {
    core_1.setFailed(error.message);
}
