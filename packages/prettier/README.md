# Prettier

`@stickyjs/prettier`

This module also installs `prettier`, `husky` and `lint-staged`.

Within your `package.json`:

```json
{
  "prettier": "@stickyjs/prettier",
  "lint-staged": {
    "*": "prettier --write --ignore-unknown"
  }
}
```

Configuring ling-staged via `.husky/pre-commit`:

```shell
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install lint-staged
```
