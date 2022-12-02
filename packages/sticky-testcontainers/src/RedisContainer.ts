import { GenericContainer, GenericStartedContainer } from './GenericContainer';

const REDIS_PORT = 6379;

export class RedisContainer extends GenericContainer {
  constructor(image: string = 'redis:7.0.4-alpine') {
    super(image);
    this.withExposedPorts(REDIS_PORT).withStartupTimeout(120_000);
  }

  public async start(): Promise<StartedRedisContainer> {
    return new StartedRedisContainer(await super.start());
  }
}

export class StartedRedisContainer extends GenericStartedContainer {
  public getContainerPort(): number {
    return REDIS_PORT;
  }

  public getPort(): number {
    return this.getHostPort();
  }
}
