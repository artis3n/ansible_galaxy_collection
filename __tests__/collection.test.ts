import { validate } from 'class-validator';
import { gt } from 'semver';

import { Collection } from '../src/Collection';
import { ExecOptions } from '@actions/exec/lib/interfaces';
import { PublishCommand } from '../src/enums';

/**
 * Stub the @actions/io 'which' command.
 */
const whichStub = function(tool: string, _check?: boolean | undefined): Promise<string> {
  return new Promise(resolve => resolve(tool));
};

/**
 * Stub the @actions/exec 'exec' command.
 * We use the stub to ensure the constructed ansible-galaxy command is formatted correctly.
 */
const execStub = function(
  commandLine: string,
  _args?: string[],
  _options?: ExecOptions,
): Promise<number> {
  return new Promise(resolve => {
    const commandArgs = commandLine.split(' ');
    const executable = commandArgs[PublishCommand.Executable];
    const command = commandArgs[PublishCommand.Command];
    const archive: string | undefined = commandArgs[PublishCommand.Archive];
    const apiKeyRaw: string | undefined = commandArgs[PublishCommand.ApiKeyFlag];

    if (command === 'build') {
      resolve(0);
    } else {
      // First 10 characters are --api-key=
      const apiKey = apiKeyRaw.slice(10);
      // Extract the version number
      const version = archive.slice(10, 15);

      if (
        executable === 'ansible-galaxy' &&
        archive === 'test-test-1.1.1.tar.gz' &&
        apiKey === 'key' &&
        // Mock the situation where we attempt to publish a version that is already on Galaxy and fail
        gt(version, '1.1.0')
      ) {
        resolve(0);
      } else {
        resolve(1);
      }
    }
  });
};

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

  test('publishes a collection', async () => {
    const collection = new Collection(
      {
        namespace: 'test',
        name: 'test',
        version: '1.1.1',
      },
      'key',
    );

    const result = await collection.publish(whichStub, execStub);
    expect(result).toEqual(0);
  });

  test('fails to publish a collection', async () => {
    const collection = new Collection(
      {
        namespace: 'test',
        name: 'test',
        // This must be less than '1.1.0' to satisfy the stub expectations for this test
        version: '1.0.0',
      },
      'key',
    );

    const result = await collection.publish(whichStub, execStub);
    expect(result).toEqual(1);
  });
});
