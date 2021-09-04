"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsSemver = void 0;
const class_validator_1 = require("class-validator");
const semver_1 = require("semver");
function IsSemver(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isSemver',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: {
                validate(version, _args) {
                    // Everything else is class-validator boilerplate, this is the real logic
                    return (0, semver_1.valid)(version) !== null;
                },
            },
        });
    };
}
exports.IsSemver = IsSemver;
