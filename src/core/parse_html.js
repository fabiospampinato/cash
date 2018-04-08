
// @require ./cash.js

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
  fragment.body.innerHTML = html;
  return fragment.body.childNodes;
}

cash.parseHTML = parseHTML;
