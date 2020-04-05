import { getInput } from '@actions/core';

describe('GitHub Action libraries', () => {
  it('accepts a non-default galaxy config file', () => {
    const expectedFile = 'fake_resource';
    process.env.INPUT_COLLECTION_DIR = expectedFile;
    const galaxyConfigFile = getInput('collection_dir');
    expect(galaxyConfigFile).toEqual(expectedFile);
  });
});
