
// @require core/cash.ts
// @require core/variables.ts

interface Cash {
  map ( callback: Function ): Cash;
}

Cash.prototype.map = function ( this: Cash, callback: Function ) {
  return cash ( map.call ( this, ( ele, i ) => callback.call ( ele, i, ele ) ) );
};
