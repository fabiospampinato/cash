
// @require core/cash.ts
// @require core/variables.ts

interface Cash {
  slice ( start?: number, end?: number ): Cash;
}

Cash.prototype.slice = function ( this: Cash ) {
  return cash ( slice.apply ( this, arguments ) );
};
