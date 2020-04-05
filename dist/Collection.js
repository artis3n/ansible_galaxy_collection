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
const io_1 = require("@actions/io");
const exec_1 = require("@actions/exec");
const decorators_1 = require("./decorators");
class Collection {
    constructor(config, apiKey) {
        this.version = '';
        this.namespace = config.namespace || '';
        this.name = config.name || '';
        this.version = config.version || '';
        this.apiKey = apiKey;
    }
    toString() {
        return `${this.namespace}-${this.name}-${this.version}`;
    }
    build() {
        return __awaiter(this, void 0, void 0, function* () {
            const galaxyCommandPath = yield io_1.which('ansible-galaxy', true);
            yield exec_1.exec(`${galaxyCommandPath} collection build`);
            yield exec_1.exec(`${galaxyCommandPath} collection publish ${this}.tar.gz --api-key=${this.apiKey}`);
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
