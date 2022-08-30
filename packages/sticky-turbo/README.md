---
title: Turbo
---

`@birthdayresearch/sticky-turbo`

An internal package for facilitating `@birthdayresearch/sticky-turbo-*` tools interoperability with `turbo.json` by
extending on top of it. Ultimately, we don't want to maintain or customize turborepo beyond light integration.

Some tools written within `sticky-*` need to be aware of the turborepo pipelines for content-aware caching of tasks.
This internal package contains internal helpers for `sticky-*` packages to provide a convention over configuration
experience.
