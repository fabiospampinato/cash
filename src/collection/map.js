
// @require ./get.js

fn.map = function ( callback ) {
  return cash ( this.get ().map ( ( ele, i ) => callback.call ( ele, i, ele ) ) );
};
