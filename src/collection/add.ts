
// @require core/cash.ts
// @require core/unique.ts
// @require ./get.ts

fn.add = function ( selector, context ) {
  return cash ( unique ( this.get ().concat ( cash ( selector, context ).get () ) ) );
};
