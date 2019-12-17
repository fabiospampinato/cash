
// @require ./cash.ts
// @require ./variables.ts
// @require ./type_checking.ts
// @require collection/get.ts
// @require manipulation/detach.ts

interface CashStatic {
  parseHTML ( html: string ): EleLoose[];
}

const fragmentRe = /^\s*<(\w+)[^>]*>/,
      singleTagRe = /^\s*<(\w+)\s*\/?>(?:<\/\1>)?\s*$/;

const containers = {
  '*': div,
  tr: tbody,
  td: tr,
  th: tr,
  thead: table,
  tbody: table,
  tfoot: table
};

function parseHTML ( html: string ): EleLoose[] {

  if ( !isString ( html ) ) return [];

  if ( singleTagRe.test ( html ) ) return [createElement ( RegExp.$1 )];

  const fragment = fragmentRe.test ( html ) && RegExp.$1,
        container = containers[fragment] || containers['*'];

  container.innerHTML = html;

  return cash ( container.childNodes ).detach ().get ();

}

cash.parseHTML = parseHTML;
