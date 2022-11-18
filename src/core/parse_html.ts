
// @require ./cash.ts
// @require ./variables.ts
// @require ./type_checking.ts
// @require collection/get.ts
// @require manipulation/detach.ts

interface CashStatic {
  parseHTML ( html: string ): EleLoose[];
}

const fragmentRe = /^\s*<(\w+)[^>]*>/;
const singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;

const containers = {
  '*': div,
  tr: tbody,
  td: tr,
  th: tr,
  thead: table,
  tbody: table,
  tfoot: table
};

//TODO: Create elements inside a document fragment, in order to prevent inline event handlers from firing
//TODO: Ensure the created elements have the fragment as their parent instead of null, this also ensures we can deal with detatched nodes more reliably

function parseHTML ( html: string ): EleLoose[] {

  if ( !isString ( html ) ) return [];

  if ( singleTagRe.test ( html ) ) return [createElement ( RegExp.$1 )];

  const fragment = fragmentRe.test ( html ) && RegExp.$1;
  const container = containers[fragment] || containers['*'];

  container.innerHTML = html;

  return cash ( container.childNodes ).detach ().get ();

}

cash.parseHTML = parseHTML;
