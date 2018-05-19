
// @require core/cash.js
// @require collection/each.js

fn.html = function ( content ) {

  if ( content === undefined ) return this[0] && this[0].innerHTML;

  const source = content.nodeType ? content[0].outerHTML : content;

  return this.each ( ( i, ele ) => { ele.innerHTML = source } );

};
