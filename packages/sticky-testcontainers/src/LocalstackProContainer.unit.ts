import fetch from 'node-fetch';

import { LocalstackProContainer } from './LocalstackProContainer';

describe('Localstack Custom Env Variables - API Key', () => {
  it('should not be throw error if api key is not defined', async () => {
    const localstack = new LocalstackProContainer();

    await expect(async () => localstack.start()).rejects.toThrowError(
      Error('Localstack Pro container cannot be started without an API key.'),
    );
  });

  it('should use localstack pro if api key is set', async () => {
    // Enforce test on CI env.
    if (process.env.LOCALSTACK_API_KEY === undefined && !process.env.CI) {
      console.warn("LOCALSTACK_API_KEY not found on local developer's machine. Skipping Test."); // eslint-disable-line no-console
      return;
    }

    const localstack = new LocalstackProContainer().withApiKey(process.env.LOCALSTACK_API_KEY ?? '');
    const startedLocalstack = await localstack.start();

    const servicesHealth = await fetch(`${startedLocalstack.getEndpoint()}/health`).then((response) => response.json());

    // Check if Pro-only services (xray, ecs, etc) are running.
    expect(servicesHealth.services.xray).toStrictEqual('available');
    expect(servicesHealth.services.ecs).toStrictEqual('available');
    expect(servicesHealth.services.kafka).toStrictEqual('available');
  });
});
