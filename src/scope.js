import deepmerge from "deepmerge";

export default function createScope (scopeData = {}) {
  const scopeLayer = [
    {
      variables: {},
      ...scopeData
    }
  ];

  return {
    push (newScope = {}) {
      scopeLayer.push(deepmerge(this.get(), newScope));
      return this.get();
    },

    get () {
      return scopeLayer[scopeLayer.length - 1];
    },

    pop () {
      scopeLayer.pop();
      return this.get();
    }
  };
}
