"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Matches 1, 1.0, 1.0.0 as valid semver
 * https://regex101.com/r/npADjs/2
 */
const validSemver = /^((\d)(\.)?){0,2}\d$/;
/**
 * Validates a semver-compliant string.
 * @param input
 */
function isSemver(input) {
    return validSemver.test(input);
}
exports.isSemver = isSemver;
