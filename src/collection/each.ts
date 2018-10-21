
// @require core/cash.ts
// @require core/each.ts

fn.each = function ( callback ) {
  each ( this, ( ele, i ) => callback.call ( ele, i, ele ) );
  return this;
};
