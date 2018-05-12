
// @require collection/each.js

fn.removeAttr = function ( attr ) {
  return this.each ( ( i, ele ) => { ele.removeAttribute ( attr ) } );
};
