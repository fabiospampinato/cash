
// @require core/cash.ts
// @require collection/each.ts

fn.text = function ( content ) {

  if ( content === undefined ) return this[0] ? this[0].textContent : '';

  return this.each ( ( i, ele ) => { ele.textContent = content } );

};
