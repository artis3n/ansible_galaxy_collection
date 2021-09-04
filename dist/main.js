"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const io_1 = require("@actions/io");
const exec_1 = require("@actions/exec");
const Collection_1 = require("./Collection");
const enums_1 = require("./enums");
const class_validator_1 = require("class-validator");
const path_1 = require("path");
const GalaxyConfig_1 = require("./GalaxyConfig");
const js_yaml_1 = require("js-yaml");
const fs_1 = require("fs");
try {
    const apiKey = (0, core_1.getInput)('api_key', { required: true });
    const collectionLocation = (0, core_1.getInput)('collection_dir');
    const willBuild = ((0, core_1.getInput)('build').toLowerCase().trim() || 'true') == 'true';
    const willPublish = ((0, core_1.getInput)('publish').toLowerCase().trim() || 'true') == 'true';
    // Will always be a string, but may be an empty string if the parameter is not defined
    const maybeGalaxyVersion = (0, core_1.getInput)('galaxy_version');
    /**
     * @deprecated You probably want 'collection_dir,' not this parameter.
     */
    const galaxyConfigFile = (0, core_1.getInput)('galaxy_config_file') || 'galaxy.yml';
    const [galaxyConfigResolvedPath, galaxyConfig] = prepareConfig(galaxyConfigFile, collectionLocation);
    let collection;
    try {
        collection = new Collection_1.Collection({
            config: galaxyConfig,
            apiKey,
            customDir: collectionLocation,
            customVersion: maybeGalaxyVersion,
        });
    }
    catch (err) {
        (0, core_1.setFailed)(err);
        process.exit(enums_1.ExitCodes.ValidationFailed);
    }
    const validationErrors = (0, class_validator_1.validateSync)(collection);
    if (validationErrors.length > 0) {
        const errorMessages = validationErrors.map(error => error.constraints);
        errorMessages.forEach(error => (0, core_1.error)(JSON.stringify(error)));
        (0, core_1.setFailed)('This action encountered validation failures. Inspect the output for all validation errors.');
        process.exit(enums_1.ExitCodes.ValidationFailed);
    }
    (0, core_1.debug)(`Building collection ${collection}`);
    galaxyConfig.commit(galaxyConfigResolvedPath);
    new Promise(resolve => {
        const done = resolve;
        if (willBuild) {
            collection
                .build(io_1.which, exec_1.exec)
                .then(result => {
                (0, core_1.debug)(`Successfully built local ${collection} archive.`);
                done(result);
            })
                .catch(({ message }) => {
                (0, core_1.setFailed)(message);
                process.exit(enums_1.ExitCodes.BuildFailed);
            });
        }
        else {
            done(null);
        }
    }).then(() => {
        if (willPublish) {
            collection
                .publish(io_1.which, exec_1.exec)
                .then(() => (0, core_1.debug)(`Successfully published ${collection} to Ansible Galaxy.`))
                .catch(({ message }) => {
                (0, core_1.setFailed)(message);
                process.exit(enums_1.ExitCodes.PublishFailed);
            });
        }
    });
}
catch (error) {
    (0, core_1.setFailed)(error.message);
}
function prepareConfig(configFileName, collectionLocation) {
    let galaxyConfigFilePath = configFileName;
    if (collectionLocation.length > 0) {
        galaxyConfigFilePath = (0, path_1.join)(collectionLocation, configFileName);
    }
    (0, core_1.debug)(`Using galaxy config file locate at: ${galaxyConfigFilePath}`);
    try {
        const configContent = (0, js_yaml_1.load)((0, fs_1.readFileSync)(galaxyConfigFilePath, 'utf8'));
        return [galaxyConfigFilePath, new GalaxyConfig_1.GalaxyConfig(configContent)];
    }
    catch (e) {
        (0, core_1.setFailed)(`Was unable to read the galaxy.yml file at path: ${galaxyConfigFilePath}`);
        throw e;
    }
}
