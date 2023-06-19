import { waitForExpect } from './WaitForExpect';

it('should wait-for-expect', async () => {
  await waitForExpect(() => {}, 100);
});
