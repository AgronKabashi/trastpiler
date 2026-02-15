import { describe, it, expect, vi } from "vitest";
import { createTranspiler } from "./index.js";
import type { Handlers } from "./types.js";

describe("createTranspiler", () => {
  it("should return a function", () => {
    expect(typeof createTranspiler()).toBe("function");
  });
});

describe("transpile", () => {
  it("should call callback based on type", () => {
    const handlers: Handlers = {
      mystatement: vi.fn(),
    };

    const transpile = createTranspiler({ handlers });
    transpile({
      type: "mystatement",
    });

    expect(handlers.mystatement).toHaveBeenCalledOnce();
  });

  it("should recursively call callback based on type", () => {
    const handlers: Handlers = {
      ReturnStatement: vi.fn(({ argument }) => `return ${argument}`),

      IfStatement: vi.fn(({ test, consequent }, { transpile }) => {
        return `if ${test} then
          ${transpile(consequent)}
        end`;
      }),
    };

    const expectedResult = `if true then
          return false
        end`;

    const ast = {
      type: "IfStatement",
      test: "true",
      consequent: {
        type: "ReturnStatement",
        argument: "false",
      },
    };

    const transpile = createTranspiler({ handlers });
    const result = transpile(ast);

    expect(handlers.ReturnStatement).toHaveBeenCalledOnce();
    expect(handlers.IfStatement).toHaveBeenCalledOnce();

    expect(result).toBe(expectedResult);
  });

  it("should throw an exception when an unsupported handler is detected", () => {
    const handlers: Handlers = {};
    const transpile = createTranspiler({ handlers });

    expect(() => {
      transpile({
        type: "mystatement",
      });
    }).toThrow();
  });
});
