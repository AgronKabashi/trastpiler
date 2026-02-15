# Trastpiler

Trastpiler is an agnostic transpiler for Abstract Syntax Trees.

## Installation

```
npm install trastpiler
```

## Basic Usage

```ts
import { createTranspiler } from "trastpiler";
import type { Handlers } from "trastpiler";

// Generate an AST using parser of choice
const tree = esprima.parse(javascriptCode);

// Create a <AST-type, callback> hashmap for the supported declarations, statements and expressions.
const handlers: Handlers = {
  WhileStatement: ({ body, test }, { transpile }) =>
    `while ${transpile(test)} do
      ${transpile(body)}
    end`,

  // ...
};

// Create a transpiler and call it,
// supplying an AST node to start from
const transpile = createTranspiler({ handlers });
const transpiledCode = transpile(tree.body);
```

## API

### `createTranspiler(config)`

Creates a new transpiler instance.

| Property                                 | Type       | Description                                       |
| ---------------------------------------- | ---------- | ------------------------------------------------- |
| config                                   | `object`   |                                                   |
| &nbsp;&nbsp;&nbsp;&nbsp;handlers         | `Handlers` | Key-value pairs of node type to handler function. |
| &nbsp;&nbsp;&nbsp;&nbsp;initialScopeData | `object`   | Initial data to use for the scope. Optional.      |

Returns a `TranspileFunction` that accepts an AST node (or array of nodes) and returns the transpiled string.

### Handler Interface

A handler must have the following signature:

```ts
import type { HandlerFunction } from "trastpiler";

const myHandler: HandlerFunction = (node, { transpile, scope }) => {
  // Process this node (transpile child nodes, read/write scope, etc.)
  return transpiledCode;
};
```

| Parameter | Type                | Description                                       |
| --------- | ------------------- | ------------------------------------------------- |
| node      | `ASTNode`           | AST node with at least a `type` property.         |
| transpile | `TranspileFunction` | Recursively transpile child nodes.                |
| scope     | `ScopeData`         | Current scope data (includes `variables` object). |

#### Scope Boundaries

To create a new scope boundary (e.g., for functions or blocks), set `scopeBoundary` on the handler:

```ts
const FunctionDeclaration: HandlerFunction = (node, { transpile, scope }) => {
  // scope is a fresh layer, changes won't affect parent scope
  return `function ${node.name}() { ${transpile(node.body)} }`;
};
FunctionDeclaration.scopeBoundary = true;

const handlers: Handlers = {
  FunctionDeclaration,
  // ...
};
```

### `createScope(initialData?)`

Creates a scope manager for manual scope control.

```ts
import { createScope } from "trastpiler";

const scope = createScope({ variables: { foo: "bar" } });
scope.push(); // Create new scope layer
scope.get(); // Get current scope
scope.pop(); // Return to parent scope
```

## Types

All types are exported and can be imported directly:

```ts
import type {
  ASTNode,
  Handlers,
  HandlerFunction,
  TranspileFunction,
  TranspilerConfig,
  TranspileContext,
  TranspileOptions,
  ScopeData,
  ScopeManager,
} from "trastpiler";
```

## Examples

In the [examples](examples/) folder you may find practical examples of how to build your own libraries on top of trastpiler.

## Showcases

- [jspicl](https://github.com/AgronKabashi/jspicl) - Transpiles JavaScript into a subset of LUA.
