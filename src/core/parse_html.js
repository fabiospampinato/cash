
// @require ./cash.js
// @require ./variables.js

let fragment;

function initFragment () {
  if ( fragment ) return;
  fragment = doc.implementation.createHTMLDocument ( '' );
  const base = fragment.createElement ( 'base' );
  base.href = doc.location.href;
  fragment.head.appendChild ( base );
}

function parseHTML ( html ) { //FIXME: `<tr></tr>` can't be parsed with this
  initFragment ();
  fragment.body.innerHTML = html;
  return fragment.body.childNodes;
}

cash.parseHTML = parseHTML;
