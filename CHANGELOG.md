# Changelog

## Version 2.0.0

_2025-12-13_

### Breaking Changes

- **TypeScript rewrite** - Codebase converted to TypeScript with full type definitions
- **ESM only** - CommonJS support removed, package is now ESM-only
- **Named exports** - Default export replaced with named exports (`createTranspiler`, `createScope`)
- **Renamed `mappers` to `handlers`** - Configuration property renamed for clarity
- **Renamed `initialScope` to `initialScopeData`** - Configuration property renamed for consistency
- **Node.js 22+** - Minimum Node.js version increased to 22

### New Features

- Full TypeScript support with exported types
- Types can be imported directly from `trastpiler` or `trastpiler/types`
- Source maps and declaration maps included

### Internal Changes

- Replaced Rollup with TypeScript compiler for builds
- Replaced Mocha/Sinon with Vitest for testing
- Replaced ESLint with Prettier for formatting
- Switched from npm to Yarn
- Updated GitHub Actions workflow

### Migration from v1.x

```ts
// Before (v1.x)
import createTranspiler from "trastpiler";
const transpile = createTranspiler({ mappers, initialScope });

// After (v2.x)
import { createTranspiler } from "trastpiler";
const transpile = createTranspiler({ handlers, initialScopeData });
```

## Version 1.0.4

_2019-09-29_

- Add Github Action for validating PRs

## Version 1.0.3

_2019-09-29_

- 3rd party vulnerability update

## Version 1.0.2

_2019-08-01_

- Updated 3rd party dependencies to address their vulnerabilities

## Version 1.0.1

_2018-11-02_

- Removed esprima specific source position info when missing handlers are detected.
- Added test case for catching exception when unsupported handler is detected.
- Added Markdown to HTML example and updated README accordingly.

## Version 1.0.0

_2018-10-11_

- Functionality broken out of [jspicl](https://github.com/AgronKabashi/jspicl).
- Added tests for scope and transpile.
