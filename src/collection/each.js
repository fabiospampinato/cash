
// @require core/cash.js
// @require core/each.js

fn.each = function ( callback ) {
  each ( this, ( ele, i ) => callback.call ( ele, i, ele ) );
  return this;
};
