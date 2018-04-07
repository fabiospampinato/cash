
// @require ./get.js

fn.map = function ( callback ) {
  return cash ( this.get ().map ( callback ) );
};
