
// @require ./get.js

fn.map = function ( callback ) {
  return cash ( map.call ( this, ( ele, i ) => callback.call ( ele, i, ele ) ) );
};
