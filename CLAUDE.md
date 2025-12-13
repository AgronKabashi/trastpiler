# Trastpiler

Agnostic transpiler for Abstract Syntax Trees.

## Commands

- `yarn build` - Compile TypeScript
- `yarn test` - Run tests
- `yarn test:watch` - Run tests in watch mode
- `yarn format` - Format code with Prettier

## Code Style

- Named exports (no default exports)
- Types in separate `types.ts` file for package exports
- TypeScript + ESM only (no CommonJS)
- Keep functions small and focused
- Prefer explicit types over inference for public APIs

## Testing

- Always write tests for new functions and methods
- Co-locate test files with source (`*.test.ts`)
- Use Vitest's `describe`, `it`, `expect`, `vi.fn()`
- Run `yarn test` before committing

## Tooling

- Yarn (not npm)
- Node 22+
- Prettier for formatting (run `yarn format` before committing)
- Vitest for testing

## Git

- Commit titles only, no descriptions
- No AI attribution in commits
- Group related changes into logical commits

## Project Structure

```
src/
├── index.ts       # Main entry, exports public API
├── types.ts       # All type definitions
├── scope.ts       # Scope management
├── transpile.ts   # Internal transpilation logic
└── *.test.ts      # Tests (co-located)
```
