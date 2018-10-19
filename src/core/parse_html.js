
// @require ./cash.js
// @require ./variables.js
// @require ./type_checking.js
// @require collection/get.js
// @require manipulation/detach.js

const singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;

let fragment;

function initFragment () {
  if ( fragment ) return;
  fragment = doc.implementation.createHTMLDocument ( '' );
  const base = fragment.createElement ( 'base' );
  base.href = doc.location.href;
  fragment.head.appendChild ( base );
}

function parseHTML ( html ) {
  initFragment ();
  if ( !isString ( html ) ) html = '';
  if ( singleTagRe.test ( html ) ) return [document.createElement ( RegExp.$1 )];
  fragment.body.innerHTML = html;
  return $(fragment.body.childNodes).detach ().get ();
}

cash.parseHTML = parseHTML;
