---
title: Typescript
---

`@birthdayresearch/sticky-typescript`

Within your `tsconfig.json`:

```json
{
  "extends": "@birthdayresearch/sticky-typescript/tsconfig.json",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  },
  "include": ["src"]
}
```

Within your `tsconfig.build.json`:

```json
{
  "extends": "./tsconfig.json",
  "exclude": ["**/*.unit.ts"]
}
```
