
// @require ./cash.ts
// @require ./variables.ts
// @require ./type_checking.ts
// @require collection/get.ts
// @require manipulation/detach.ts

const fragmentRe = /^\s*<(\w+)[^>]*>/,
      singleTagRe = /^\s*<(\w+)\s*\/?>(?:<\/\1>)?\s*$/;

let containers: { [index: string]: HTMLElement };

function initContainers () {

  if ( containers ) return;

  const table = doc.createElement ( 'table' ),
        tr = doc.createElement ( 'tr' );

  containers = {
    '*': doc.createElement ( 'div' ),
    tr: doc.createElement ( 'tbody' ),
    td: tr,
    th: tr,
    thead: table,
    tbody: table,
    tfoot: table,
  };

}

function parseHTML ( html: string ): Ele[] {

  initContainers ();

  if ( !isString ( html ) ) return [];

  if ( singleTagRe.test ( html ) ) return [doc.createElement ( RegExp.$1 )];

  const fragment = fragmentRe.test ( html ) && RegExp.$1,
        container = containers[fragment] || containers['*'];

  container.innerHTML = html;

  return cash ( container.childNodes ).detach ().get ();

}

interface CashStatic {
  parseHTML ( html: string ): Ele[];
}

cash.parseHTML = parseHTML;
