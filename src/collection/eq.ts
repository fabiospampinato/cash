
// @require core/cash.ts
// @require ./get.ts

fn.eq = function ( index ) {
  return cash ( this.get ( index ) );
};
