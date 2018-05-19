
// @require core/cash.js
// @require core/unique.js
// @require ./get.js

fn.add = function ( selector, context ) {
  return cash ( unique ( this.get ().concat ( cash ( selector, context ).get () ) ) );
};
