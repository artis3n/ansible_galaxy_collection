import { validate } from 'class-validator';

import { Collection } from '../src/Collection';

describe('Collection', () => {
  test('No errors with valid input', async () => {
    const collection = new Collection(
      {
        namespace: 'test',
        name: 'test',
        version: '1.0.0',
      },
      'key',
    );
    const errors = await validate(collection);
    expect(errors).toHaveLength(0);
  });

  test('Fails to validate a collection with invalid inputs', async () => {
    const collection = new Collection(
      {
        namespace: '',
        name: '',
        version: '',
      },
      'key',
    );
    const errors = await validate(collection);
    expect(errors).toHaveLength(3);
  });

  test('Fails to validate a non-semver string', async () => {
    const collection = new Collection(
      {
        namespace: 'test',
        name: 'test',
        version: '1.2.a',
      },
      'key',
    );
    const errors = await validate(collection);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isSemver).toEqual('1.2.a must be semver-compatible');
  });

  test('toString returns namespace, name, and version', () => {
    const collection = new Collection(
      {
        namespace: 'test',
        name: 'test',
        version: '1.1.0',
      },
      'key',
    );
    expect(`${collection}`).toEqual('test-test-1.1.0');
  });
});
