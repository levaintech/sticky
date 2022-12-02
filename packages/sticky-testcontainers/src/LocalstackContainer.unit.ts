import { CreateKeyCommand, KMSClient } from '@aws-sdk/client-kms';

import { LocalstackContainer } from './LocalstackContainer';

describe('Localstack Ports', () => {
  it('should return numeric value when mapped ports are requested', async () => {
    const localstack = new LocalstackContainer();
    const startedLocalstack = await localstack.start();

    localstack.getLocalstackServicePorts().forEach((port) => {
      expect(startedLocalstack.getMappedPort(port)).toEqual(expect.any(Number));
    });
  });
});

describe('Localstack Custom Env Variables - Region', () => {
  it('should default to ap-southeast-1 region', async () => {
    const localstack = new LocalstackContainer();
    const startedLocalstack = await localstack.start();

    expect((await startedLocalstack.exec(['printenv', 'DEFAULT_REGION'])).output.trimEnd()).toEqual('ap-southeast-1');
  });

  it('should be able to set aws region', async () => {
    const localstack = new LocalstackContainer().withRegion('us-west-1');
    const startedLocalstack = await localstack.start();

    expect((await startedLocalstack.exec(['printenv', 'DEFAULT_REGION'])).output.trimEnd()).toEqual('us-west-1');
  });
});

it('should connect with KMSClient', async () => {
  const localstack = new LocalstackContainer();
  const startedLocalstack = await localstack.start();

  const client = new KMSClient({
    region: 'us-west-2',
    endpoint: startedLocalstack.getEndpoint(),
    credentials: {
      accessKeyId: 'AnythingIsOkay',
      secretAccessKey: 'NoRulesSoAnythingIsFineAsLongNotEmpty',
    },
  });

  const command = new CreateKeyCommand({ Description: 'Testing Key' });
  const response = await client.send(command);
  expect(response).toBeDefined();
  expect(response.KeyMetadata?.Description).toStrictEqual('Testing Key');
});
