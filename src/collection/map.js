
// @require core/cash.js
// @require core/variables.js

fn.map = function ( callback ) {
  return cash ( map.call ( this, ( ele, i ) => callback.call ( ele, i, ele ) ) );
};
