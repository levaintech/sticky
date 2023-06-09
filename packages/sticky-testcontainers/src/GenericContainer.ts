import { randomUUID } from 'node:crypto';

import { AbstractStartedContainer,GenericContainer as AbstractGenericContainer } from 'testcontainers';

export type { StartedTestContainer } from 'testcontainers';

export class GenericContainer extends AbstractGenericContainer {
  constructor(image: string) {
    super(image);
    this.withName(`${image.replaceAll(/[^a-zA-Z0-9.-]/g, '-')}-${randomUUID()}`);
  }
}

export abstract class GenericStartedContainer extends AbstractStartedContainer {
  /**
   * @return {number} container port
   */
  public abstract getContainerPort(): number;

  /**
   * @return {number} host port
   */
  public getHostPort(): number {
    return this.getMappedPort(this.getContainerPort());
  }

  /**
   * @return {string} schemaless host address with port
   */
  public getHostAddress(): string {
    return `${this.getHost()}:${this.getHostPort()}`;
  }
}
