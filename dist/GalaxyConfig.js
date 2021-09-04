"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalaxyConfig = void 0;
const semver_1 = require("semver");
const js_yaml_1 = require("js-yaml");
const fs_1 = require("fs");
/**
 * Represents the contents of a galaxy.yml Ansible Galaxy config file.
 */
class GalaxyConfig {
    constructor(config) {
        this.changes = false;
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
    set version(input) {
        if ((0, semver_1.valid)(input)) {
            this.config.version = input;
            this.changes = true;
        }
        else {
            throw new Error(`${input} is not valid semver`);
        }
    }
    /**
     * Writes this config back into its original file if changes have occurred to its contents.
     */
    commit(filePath) {
        if (this.changes) {
            const yamlAsString = (0, js_yaml_1.dump)(this.config);
            (0, fs_1.writeFileSync)(filePath, yamlAsString, 'utf8');
        }
    }
}
exports.GalaxyConfig = GalaxyConfig;
