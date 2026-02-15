export interface ScopeData {
  variables: Record<string, unknown>;
  [key: string]: unknown;
}

export interface ScopeManager {
  push(newScope?: Partial<ScopeData>): ScopeData;
  get(): ScopeData;
  pop(): ScopeData;
}

export interface ASTNode {
  type: string;
  [key: string]: unknown;
}

export interface TranspileContext {
  transpile: TranspileFunction;
  scope: ScopeData;
}

export interface HandlerFunction {
  (node: ASTNode, context: TranspileContext): string | undefined | null;
  scopeBoundary?: boolean;
}

export interface Handlers {
  [nodeType: string]: HandlerFunction;
}

export interface TranspileOptions {
  arraySeparator?: string;
}

export interface TranspileFunction {
  (node: ASTNode | ASTNode[] | null | undefined, options?: TranspileOptions): string;
}

export interface TranspilerConfig {
  handlers?: Handlers;
  initialScopeData?: Partial<ScopeData>;
}
