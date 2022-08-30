---
title: Jest
---

`@birthdayresearch/sticky-jest`

```json
{
  "jest": {
    "preset": "@birthdayresearch/sticky-jest"
  }
}
```

## Included Extensions

### `wait-for-expect`

```ts
import { waitForExpect } from '@birthdayresearch/sticky-jest';

it('should wait-for-expect', async () => {
  await waitForExpect(() => {}, 100);
});
```

### `jest-extended`

```ts
import 'jest-extended';

it('should contain jest-extended', () => {
  expect(1).toBeOneOf([1, 2, 3]);
  expect('').toBeEmpty();
});
```
