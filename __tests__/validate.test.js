"use strict";
exports.__esModule = true;
var validate_1 = require("../src/validate");
describe('semver validation', function () {
    test('is valid 1.1.1 semver', function () {
        var semver = '1.1.0';
        expect(validate_1.isSemver(semver)).toBeTruthy();
    });
    test('is valid 1.1 semver', function () {
        var semver = '1.1';
        expect(validate_1.isSemver(semver)).toBeTruthy();
    });
    test('is valid 1 semver', function () {
        var semver = '1';
        expect(validate_1.isSemver(semver)).toBeTruthy();
    });
    test('rejects invalid semver', function () {
        var notSemver = 'a';
        expect(validate_1.isSemver(notSemver)).toBeFalsy();
    });
    test('rejects invalid x.x.x semver', function () {
        var notSemver = '1.f.2';
        expect(validate_1.isSemver(notSemver)).toBeFalsy();
    });
});
