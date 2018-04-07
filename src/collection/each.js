
// @require core/index.js

fn.each = function ( callback ) {
  each ( this, callback );
  return this;
};
