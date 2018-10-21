
// @require core/cash.ts
// @require collection/each.ts

fn.removeProp = function ( prop ) {
  return this.each ( ( i, ele ) => { delete ele[prop] } );
};
