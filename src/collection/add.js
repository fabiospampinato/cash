
// @require core/index.js

fn.add = function ( selector, context ) {
  return cash ( unique ( this.get ().concat ( cash ( selector, context ).get () ) ) );
};
