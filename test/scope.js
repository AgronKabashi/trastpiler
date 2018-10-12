import assert from "assert";
import createScope from "scope";

describe("scope", () => {
  let scope;

  it("should contain variables property", () => {
    const scope = createScope();
    assert.deepStrictEqual(scope.get(), {
      variables: {}
    });
  });

  it("should accept an initial state for the scope", () => {
    const scope = createScope({
      customProp: true
    });
    assert.deepStrictEqual(scope.get(), {
      variables: {},
      customProp: true
    });
  });

  it("should be possible to mutate current scope layer", () => {
    const scope = createScope();
    scope.get().customProp = true
    assert.deepStrictEqual(scope.get(), {
      variables: {},
      customProp: true
    });
  });

  it("should be possible to mutate variables in scope layer", () => {
    const scope = createScope();
    scope.get().variables.customVariable = true;

    assert.deepStrictEqual(scope.get(), {
      variables: {
        customVariable: true
      }
    });
  });

  describe("push & pop", () => {
    it("should inherit current scope when adding a new layer", () => {
      const scope = createScope({
        customProp: true,
        variables: {
          customVariable: true
        }
      });

      assert.deepStrictEqual(scope.push(), {
        variables: {
          customVariable: true
        },
        customProp: true
      });
    });

    it("should not affect parent scope when mutating current scope directly", () => {
      const scope = createScope({
        customProp: true
      });

      const newScope = scope.push();
      newScope.customProp = false;
      newScope.variables.customVariable = false;
      scope.pop();

      assert.deepStrictEqual(scope.push(), {
        variables: {},
        customProp: true
      });
    });

    it("should not affect parent scope when mutating current scope through push", () => {
      const scope = createScope();

      scope.push({
        customProp: false
      });

      scope.pop();

      assert.deepStrictEqual(scope.push(), {
        variables: {}
      });
    });
  });
});
