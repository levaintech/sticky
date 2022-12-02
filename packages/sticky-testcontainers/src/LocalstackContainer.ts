import { Wait } from 'testcontainers';

import { GenericContainer, GenericStartedContainer } from './GenericContainer';

const LOCALSTACK_EDGE_PORT = 4566;

export class LocalstackContainer extends GenericContainer {
  protected region = 'ap-southeast-1';

  protected bindMountHost = '/var/run/docker.sock';

  public withRegion(region: string): this {
    this.region = region;
    return this;
  }

  public withBindMountHost(bindMountHost: string): this {
    this.bindMountHost = bindMountHost;
    return this;
  }

  constructor(image: string = 'localstack/localstack:1.2.0') {
    super(image);
  }

  public async start(): Promise<StartedLocalstackContainer> {
    this.withStartupTimeout(120_000)
      .withEnvironment({
        MAIN_CONTAINER_NAME: this.name,
        DEBUG: '1',
        DEFAULT_REGION: this.region,
      })
      .withBindMounts([
        {
          source: this.bindMountHost,
          target: '/var/run/docker.sock',
        },
      ])
      .withExposedPorts(...this.getLocalstackServicePorts())
      .withHealthCheck({
        test: ['CMD-SHELL', `curl -s http://localhost:${LOCALSTACK_EDGE_PORT} || jq .status == 'running'`],
      })
      .withWaitStrategy(Wait.forHealthCheck());

    return new StartedLocalstackContainer(await super.start());
  }

  /**
   * Generates all required services from localstack
   * 4510-4559 for all services
   * 4566 for localstack edge proxy
   * @returns ports that should be exposed
   */
  public getLocalstackServicePorts(): number[] {
    return [...Array(50).keys()].map((_, i) => 4510 + i).concat(LOCALSTACK_EDGE_PORT);
  }
}

export class StartedLocalstackContainer extends GenericStartedContainer {
  public getContainerPort(): number {
    return LOCALSTACK_EDGE_PORT;
  }

  public getEndpoint(): string {
    return `http://${this.getHostAddress()}`;
  }
}
