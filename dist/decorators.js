"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const semver_1 = require("semver");
function IsSemver(validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: 'isSemver',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: {
                validate(version, _args) {
                    // Everything else is class-validator boilerplate, this is the real logic
                    return semver_1.valid(version) !== null;
                },
            },
        });
    };
}
exports.IsSemver = IsSemver;