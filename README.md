# Sticky

A collection of modern standards, tools, and services to build scalable JS/TS apps and libraries.

While `@stickyjs/*` provides opinionated configuration and standards.
Using such tools is optional and non-mutually exclusive; you can choose to opt out, override or extend any packages as you wish.

## Packages

All packages follow the `@stickyjs/` prefix, with `eslint-config` being the exception.
As with all modern NodeJS/JavaScript projects, we follow a monorepo structure with its concerns separated.
All dependencies are published with the same version tag.

| Package                 | Type     | Description                                                                          |
| ----------------------- | -------- | ------------------------------------------------------------------------------------ |
| @stickyjs/docs          | Docs     | Current documentation for this project.                                              |
| @stickyjs/eslint-config | Linting  | Standardized eslint config                                                           |
| @stickyjs/jest          | Testing  | Standardized jest and ts-jest                                                        |
| @stickyjs/prettier      | Linting  | Standardized prettier config                                                         |
| @stickyjs/turbo         | Pipeline | Internal package for facilitating `turbo-*` tools interoperability with `turbo.json` |
| @stickyjs/turbo-jest    | Testing  | Turbo aware jest-preset, automatically run `dependsOn` script before running jest    |
| @stickyjs/typescript    | Language | Enforce consistent typescript version.                                               |
