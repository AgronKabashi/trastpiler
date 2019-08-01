# Trastpiler
Trastpiler is an agnostic transpiler for Abstract Syntax Trees.

## Installation
```
npm install trastpiler --save
```

## Basic Usage
```js
import createTranspiler from "trastpiler";

// Generate an AST using parser of choice
const tree = esprima.parse(javascriptCode);

// Create a <AST-type, callback> hashmap for the supported declarations, statements and expressions.
const mappers = {
  WhileStatement: ({ body, test }, { transpile }) =>
    `while ${transpile(test)} do
      ${transpile(body)}
    end`,

  // ...
};

// Create a transpiler and call it,
// supplying an AST node to start from
const transpile = createTranspiler({ mappers });
const transpiledCode = transpile(tree.body);
```

## Arguments
| Property              | Type                      | Description |
|-----------------------|---------------------------|-------------|
| configuration         | object                    |             |
| &nbsp;&nbsp;&nbsp;&nbsp;mappers       | HashMap<string, function> | Key-value pairs of a declaration/expression/statement type and function to process the AST node. |
| &nbsp;&nbsp;&nbsp;&nbsp;initialScope  | object                    | Initial data to use for the scope. |

## Declaration/Expression/Statement Interface
A declaration, expression or statement must have the following signature:
```js
/**
 * @param {object} node AST node. Nodes must atleast have a `type` property
 * @param {{ transpile, scope }} references References to the current scope and transpiler function - optional.
 * @return {string} transpiled node
 */
function expressionTypeName (node, { transpile, scope }) {
  // Do stuff relevant for this expression (transpile child nodes, add variables to scope etc)
  return transpiledCode;
}
```

## Examples
In the [examples](examples/) folder you may find some practical examples of how to build your own libraries on top of trastpiler.

## Showcases
* [jspicl](https://github.com/AgronKabashi/jspicl) - Transpiles JavaScript into a subset of LUA.
