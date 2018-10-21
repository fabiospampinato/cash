
// @require core/cash.ts
// @require ./get.ts

interface Cash {
  eq ( index: number ): Cash;
}

Cash.prototype.eq = function ( this: Cash, index: number ) {
  return cash ( this.get ( index ) );
};
