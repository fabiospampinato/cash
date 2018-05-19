
// @require core/cash.js
// @require collection/each.js

fn.text = function ( content ) {

  if ( content === undefined ) return this[0] ? this[0].textContent : '';

  return this.each ( ( i, ele ) => { ele.textContent = content } );

};
