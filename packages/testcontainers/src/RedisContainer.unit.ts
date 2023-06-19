import { RedisContainer } from './RedisContainer';

it('should start and stop gracefully', async () => {
  const container = new RedisContainer();
  const started = await container.start();
  expect(started.getContainerPort()).toStrictEqual(6379);
  await started.stop();
});
