# Sticky

A collection of sticky modern standards, tools, and services for Birthday Research to build scalable JS/TS apps and
libraries.

While `@birthdayresearch/sticky-*` provides opinionated configuration and standards for Birthday Research Open Source
use. Using such tools is optional and non-mutually exclusive; you can choose to opt out, override or extend any packages
as you wish.

## Packages

All packages follow the `@birthdayresearch/sticky-` prefix, with `eslint-config` being the exception. As with all modern
NodeJS/JavaScript projects, we follow a monorepo structure with its concerns separated. All dependencies are published
with the same version tag.

| Package                             | Type     | Description                                                                                 |
| ----------------------------------- | -------- | ------------------------------------------------------------------------------------------- |
| @birthdayresearch/eslint-config     | Linting  | Standardized eslint config for Birthday Research                                            |
| @birthdayresearch/sticky-docs       | Docs     | Current documentation for this project.                                                     |
| @birthdayresearch/sticky-jest       | Testing  | Standardized jest and ts-jest config for Birthday Research                                  |
| @birthdayresearch/sticky-prettier   | Linting  | Standardized prettier config for Birthday Research                                          |
| @birthdayresearch/sticky-turbo      | Pipeline | Internal package for facilitating `sticky-turbo-*` tools interoperability with `turbo.json` |
| @birthdayresearch/sticky-turbo-jest | Testing  | Turbo aware jest-preset, automatically run `dependsOn` script before running jest           |
| @birthdayresearch/sticky-typescript | Language | Enforce consistent typescript version throughout the entire Birthday Research               |
