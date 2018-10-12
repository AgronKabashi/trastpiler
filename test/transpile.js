import assert from "assert";
import sinon from "sinon";
import createTranspiler from "index";

describe("createTranspiler", () => {
  it("should return a function", () => {
    assert.equal(typeof createTranspiler(), "function");
  });
});

describe("transpile", () => {
  it("should call callback based on type", () => {
    const mappers = {
      mystatement: sinon.spy()
    };

    const transpile = createTranspiler({ mappers });
    transpile({
      type: "mystatement"
    });

    assert(mappers.mystatement.calledOnce);
  });

  it("should recursively call callback based on type", () => {
    const mappers = {
      ReturnStatement: sinon.spy(({ argument }) => `return ${argument}`),

      IfStatement: sinon.spy(({ test, consequent }, { transpile }) => {
        return `if ${test} then
          ${transpile(consequent)}
        end`;
      })
    };

    const expectedResult = `if true then
          return false
        end`;

    const ast = {
      type: "IfStatement",
      test: "true",
      consequent: {
        type: "ReturnStatement",
        argument: "false"
      }
    };

    const transpile = createTranspiler({ mappers });
    const result = transpile(ast);

    assert(mappers.ReturnStatement.calledOnce);
    assert(mappers.IfStatement.calledOnce);

    assert.equal(result, expectedResult);
  });
});
