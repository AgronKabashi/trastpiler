[![Edit mry5z6zxy](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mry5z6zxy?hidenavigation=1&module=%2Fsrc%2FmarkdownToHtml.js)

```js
/**
 * Small library for converting Markdown to HTML
 */
import remark from "remark";
import createTranspiler from "trastpiler";

const mappers = {
  root: ({ children }, { transpile, scope }) => {
    const content = transpile(children);
    return scope.includeRoot ? `<html><body>${content}</body></html>` : content;
  },
  blockquote: ({ children }, { transpile }) => `<blockquote>${transpile(children)}</blockquote>`,
  code: ({ value }) => `<code>${value}</code>`,
  delete: ({ children }, { transpile }) => `<s>${transpile(children)}</s>`,
  emphasis: ({ children }, { transpile }) => `<em>${transpile(children)}</em>`,
  heading: ({ depth, children }, { transpile }) => `<h${depth}>${transpile(children)}</h${depth}>`,
  html: ({ value }) => value,
  image: ({ url, alt }) => `<img alt="{${alt}" src="${url}">`,
  inlineCode: ({ value }) => `<code>${value}</code>`,
  link: ({ url, children }, { transpile }) => `<a href="${url}">${transpile(children)}</a>`,
  list: ({ ordered, children }, { transpile }) => {
    const tag = ordered ? "ol" : "ul";
    return `<${tag}>${transpile(children)}</${tag}>`;
  },
  listItem: ({ children }, { transpile }) => `<li>${transpile(children)}</li>`,
  paragraph: ({ children }, { transpile }) => `<p>${transpile(children)}</p>`,
  strong: ({ children }, { transpile }) => `<strong>${transpile(children)}</strong>`,
  table: ({ children }, { transpile }) => `<table>${transpile(children)}</table>`,
  tableCell: ({ children }, { transpile }) => `<td>${transpile(children)}</td>`,
  tableRow: ({ children }, { transpile }) => `<tr>${transpile(children)}</tr>`,
  text: ({ value }) => value,
  thematicBreak: () => "<hr>",

  // More advanced features
  definition: () => "",
  imageReference: () => "",
  linkReference: () => ""
};

export default function markdownToHtml (content, options) {
  const ast = remark.parse(content);
  const transpile = createTranspiler({
    mappers,
    initialScopeData: {
      includeRoot: true,
      ...options
    }
  });

  return transpile(ast);
}
```
