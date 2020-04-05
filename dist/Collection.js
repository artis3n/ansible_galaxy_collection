"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const class_validator_1 = require("class-validator");
const decorators_1 = require("./decorators");
/**
 * An Ansible Galaxy Collection.
 */
class Collection {
    /**
     * Validation of input is handled by decorators.
     */
    constructor(config, apiKey, customDir) {
        this.namespace = config.namespace || '';
        this.name = config.name || '';
        this.version = config.version || '';
        this.apiKey = apiKey;
        this.customDir = customDir;
    }
    toString() {
        return `${this.namespace}-${this.name}-${this.version}`;
    }
    get path() {
        if (this.customDir && this.customDir.length > 0) {
            return this.customDir;
        }
        return '';
    }
    /**
     * Publishes a Collection to Ansible Galaxy.
     * @param which Either which from @actions/io or an injected stub for testing
     * @param exec Either exec from @actions/exec or an injected stub for testing
     */
    publish(which, exec) {
        return __awaiter(this, void 0, void 0, function* () {
            const galaxyCommandPath = yield which('ansible-galaxy', true);
            // If a custom directory is passed in, use that. Otherwise, do not specify a custom location.
            yield exec(`${galaxyCommandPath} collection build ${this.path}`);
            return exec(`${galaxyCommandPath} collection publish ${this}.tar.gz --api-key=${this.apiKey}`);
        });
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Collection.prototype, "namespace", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Collection.prototype, "name", void 0);
__decorate([
    decorators_1.IsSemver({ message: '$value must be semver-compatible' }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Collection.prototype, "version", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Collection.prototype, "apiKey", void 0);
exports.Collection = Collection;