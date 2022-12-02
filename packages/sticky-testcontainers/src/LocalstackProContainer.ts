import { LocalstackContainer, StartedLocalstackContainer } from './LocalstackContainer';

export class LocalstackProContainer extends LocalstackContainer {
  protected apiKey = '';

  public withApiKey(apiKey: string): this {
    this.apiKey = apiKey.trim();
    return this;
  }

  public async start(): Promise<StartedLocalstackContainer> {
    if (this.apiKey.length === 0) {
      throw new Error('Localstack Pro container cannot be started without an API key.');
    }

    this.withEnvironment({
      LOCALSTACK_API_KEY: this.apiKey,
      REQUIRE_PRO: '1',
    });

    return new StartedLocalstackContainer(await super.start());
  }
}
