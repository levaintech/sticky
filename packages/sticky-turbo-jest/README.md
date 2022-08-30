---
title: Turbo Jest
---

`@birthdayresearch/sticky-turbo-jest`

Turbo aware `jest-preset`; automatically run `dependsOn` script before running jest. By taking advantage of
content-aware hashing from turborepo. `dependsOn` only run if the pipeline `inputs` have changed.

When you run your test with `@birthdayresearch/sticky-turbo-jest` preset, it uses `displayName` from your jest config to
figure out which `pipeline` to use. It will automatically pinpoint the corresponding `dependsOn` and run all the scripts
specified within.

E.g. `turbo.json` and `package.json`:

```json
{
  "pipeline": {
    "test:e2e": {
      "inputs": ["src/**", "**/*.e2e.ts"],
      "dependsOn": ["build:docker"]
    }
  }
}
```

```json
{
  "scripts": {
    "build:docker": "docker build ..."
  },
  "jest": {
    "preset": "@birthdayresearch/sticky-turbo-jest",
    "projects": [
      {
        "displayName": "test:e2e",
        "preset": "@birthdayresearch/sticky-turbo-jest",
        "testRegex": ".*\\.e2e\\.ts$"
      }
    ]
  }
}
```
