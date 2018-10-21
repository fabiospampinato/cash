
// @require core/cash.ts
// @require collection/each.ts

fn.html = function ( content ) {

  if ( content === undefined ) return this[0] && this[0].innerHTML;

  const source = content.nodeType ? content[0].outerHTML : content;

  return this.each ( ( i, ele ) => { ele.innerHTML = source } );

};
