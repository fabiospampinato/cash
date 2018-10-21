
// @require core/cash.ts
// @require ./eq.ts

interface Cash {
  first (): Cash;
}

Cash.prototype.first = function ( this: Cash ) {
  return this.eq ( 0 );
};
