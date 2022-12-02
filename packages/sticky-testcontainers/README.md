---
title: Test Containers
sections: ['Testcontainers']
---

`@birthdayresearch/sticky-testcontainers`

Providing opinionated containers that follows the `testcontainers-node` Fluent API design.

- `PostgreSqlContainer` - for a Postgres database docker container
- `LocalstackContainer` - for a Localstack cloud docker container
- `RedisContainer` - for a Redis docker container

Example with PostgresSqlContainer:

```ts
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@birthdayresearch/sticky-testcontainers';

let postgres: StartedPostgreSqlContainer;

beforeAll(async () => {
  postgres = await new PostgreSqlContainer().start();
});

afterAll(async () => {
  await postgres.stop();
});
```

With network:

```ts
import { PostgreSqlContainer, RedisContainer, Network } from '@birthdayresearch/sticky-testcontainers';

beforeAll(async () => {
  const network = await new Network().start();
  const postgres = await new PostgreSqlContainer().withNetwork(network).start();
  const redis = await new RedisContainer().withNetwork(network).start();
});

afterAll(async () => {
  await postgres.stop();
  await redis.stop();
  await network.stop();
});
```
