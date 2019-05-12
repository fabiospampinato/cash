
// @require core/cash.ts
// @require core/variables.ts

type MapCallback<T> = ( this: T, index: number, ele: T ) => Ele;

interface Cash {
  map ( callback: MapCallback<Ele> ): Cash;
}

Cash.prototype.map = function ( this: Cash, callback: MapCallback<Ele> ) {
  return cash ( map.call ( this, ( ele: Ele, i: number ) => callback.call ( ele, i, ele ) ) );
};
