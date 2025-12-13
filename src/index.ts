import { createScope } from "./scope.js";
import { transpile } from "./transpile.js";
import type { TranspileFunction, TranspilerConfig } from "./types.js";

export function createTranspiler({
  handlers = {},
  initialScopeData,
}: TranspilerConfig = {}): TranspileFunction {
  const config = {
    scope: createScope(initialScopeData),
    handlers,
  };

  const decoratedTranspile: TranspileFunction = (node, options) =>
    transpile({ ...config, decoratedTranspile }, node, options);

  return decoratedTranspile;
}

export { createScope } from "./scope.js";
export * from "./types.js";
