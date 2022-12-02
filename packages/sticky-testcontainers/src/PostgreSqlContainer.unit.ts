import { PostgreSqlContainer } from './PostgreSqlContainer';

it('should start and stop gracefully', async () => {
  const container = new PostgreSqlContainer();
  const started = await container.start();
  expect(started.getContainerPort()).toStrictEqual(5432);
  await started.stop();
});
