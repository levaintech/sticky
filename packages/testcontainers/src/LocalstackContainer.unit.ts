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
