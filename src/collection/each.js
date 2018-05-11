
// @require core/index.js

fn.each = function ( callback ) {
  each ( this, ( ele, i ) => callback.call ( ele, i, ele ) );
  return this;
};
