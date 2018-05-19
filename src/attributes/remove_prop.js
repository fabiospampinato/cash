
// @require core/cash.js
// @require collection/each.js

fn.removeProp = function ( prop ) {
  return this.each ( ( i, ele ) => { delete ele[prop] } );
};
