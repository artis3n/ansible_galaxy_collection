import { isSemver } from '../src/validate';

describe('semver validation', () => {
  test('is valid 1.1.1 semver', () => {
    const semver = '1.1.0';
    expect(isSemver(semver)).toBeTruthy();
  });

  test('is valid 1.1 semver', () => {
    const semver = '1.1';
    expect(isSemver(semver)).toBeTruthy();
  });

  test('is valid 1 semver', () => {
    const semver = '1';
    expect(isSemver(semver)).toBeTruthy();
  });

  test('rejects invalid semver', () => {
    const notSemver = 'a';
    expect(isSemver(notSemver)).toBeFalsy();
  });

  test('rejects invalid x.x.x semver', () => {
    const notSemver = '1.f.2';
    expect(isSemver(notSemver)).toBeFalsy();
  });
});
