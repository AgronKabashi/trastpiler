import type {
  ASTNode,
  Handlers,
  ScopeManager,
  TranspileFunction,
  TranspileOptions,
} from "./types.js";

export interface InternalConfig {
  handlers: Handlers;
  scope: ScopeManager;
  decoratedTranspile?: TranspileFunction;
}

export function transpile(
  config: InternalConfig,
  node: ASTNode | ASTNode[] | null | undefined,
  { arraySeparator = "\n" }: TranspileOptions = {}
): string {
  const nodes = Array.isArray(node) ? node : [node];

  return nodes
    .filter((n): n is ASTNode => Boolean(n))
    .map((n) => {
      const handler = config.handlers[n.type];
      if (!handler) {
        throw new Error(`\x1b[41m\x1b[37mThere is no handler for ${n.type}\x1b[0m`);
      }

      const result =
        handler(n, {
          transpile: config.decoratedTranspile!,
          scope: handler.scopeBoundary ? config.scope.push() : config.scope.get(),
        }) || "";

      if (handler.scopeBoundary) {
        config.scope.pop();
      }

      return result;
    })
    .join(arraySeparator);
}
