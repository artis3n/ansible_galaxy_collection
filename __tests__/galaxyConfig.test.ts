import { GalaxyConfig } from '../src/GalaxyConfig';

describe('GalaxyConfig', () => {
  test('sets a new version if valid semver', () => {
    const newVersion = '1.1.5';
    const config = new GalaxyConfig({
      version: '1.1.0',
    });
    config.version = newVersion;
    expect(config.version).toEqual(newVersion);
  });

  test('rejects a new version if not valid semver', () => {
    const newVersion = '1.1.4s';
    const config = new GalaxyConfig({
      version: '1.1.0',
    });
    expect(() => {
      config.version = newVersion;
    }).toThrow(`${newVersion} is not valid semver`);
  });
});
