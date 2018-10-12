import createScope from "./scope";

const transpile = ({ mappers, scope, decoratedTranspile }, node, { arraySeparator = "\n" } = {}) =>
  (Array.isArray(node) ? node : [node])
    .filter(node => node)
    .map(node => {
      // Attempt to find the specific declaration, expression or statement
      const mapper = mappers[node.type];
      if (!mapper) {
        const { loc: { start = {} } = {} } = node;
        throw new Error(`\x1b[41m\x1b[37mThere is no handler for ${node.type}, line ${start.line} column ${start.column}\x1b[0m`);
      }

      const result = mapper(node, {
        transpile: decoratedTranspile,
        scope: mapper.scopeBoundary ? scope.push() : scope.get()
      }) || "";

      mapper.scopeBoundary && scope.pop();

      return result;
    })
    .join(arraySeparator); // eslint-disable-line no-use-before-define

export default function createTranspiler ({ mappers = {}, initialScopeData } = {}) {
  const config = {
    scope: createScope(initialScopeData),
    mappers
  };

  return (config.decoratedTranspile = transpile.bind(null, config));
}
