import deepmerge from "deepmerge";
import type { ScopeData, ScopeManager } from "./types.js";

export function createScope(scopeData: Partial<ScopeData> = {}): ScopeManager {
  const scopeLayer: ScopeData[] = [
    {
      variables: {},
      ...scopeData,
    },
  ];

  return {
    push(newScope: Partial<ScopeData> = {}): ScopeData {
      scopeLayer.push(deepmerge(this.get(), newScope));
      return this.get();
    },

    get(): ScopeData {
      return scopeLayer[scopeLayer.length - 1];
    },

    pop(): ScopeData {
      scopeLayer.pop();
      return this.get();
    },
  };
}
