import { v4 as uuidv4 } from 'uuid';

import { GenericContainer, GenericStartedContainer, StartedTestContainer } from './GenericContainer';

const POSTGRES_PORT = 5432;

export class PostgreSqlContainer extends GenericContainer {
  protected database = 'test';

  protected username = uuidv4();

  protected password = uuidv4();

  constructor(image: string = 'postgres:14.5') {
    super(image);
    this.withExposedPorts(POSTGRES_PORT).withStartupTimeout(120_000);
  }

  public withDatabase(database: string): this {
    this.database = database;
    return this;
  }

  public withUsername(username: string): this {
    this.username = username;
    return this;
  }

  public withPassword(password: string): this {
    this.password = password;
    return this;
  }

  public async start(): Promise<StartedPostgreSqlContainer> {
    this.withEnvironment({
      POSTGRES_DB: this.database,
      POSTGRES_USER: this.username,
      POSTGRES_PASSWORD: this.password,
    });

    return new StartedPostgreSqlContainer(await super.start(), this.database, this.username, this.password);
  }
}

export class StartedPostgreSqlContainer extends GenericStartedContainer {
  constructor(
    started: StartedTestContainer,
    private readonly database: string,
    private readonly username: string,
    private readonly password: string,
  ) {
    super(started);
  }

  public getContainerPort(): number {
    return POSTGRES_PORT;
  }

  public getPort(): number {
    return this.getMappedPort(this.getContainerPort());
  }

  public getDatabase(): string {
    return this.database;
  }

  public getUsername(): string {
    return this.username;
  }

  public getPassword(): string {
    return this.password;
  }
}
