
// @require core/cash.js
// @require ./get.js

fn.eq = function ( index ) {
  return cash ( this.get ( index ) );
};
