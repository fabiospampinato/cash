
// @require core/cash.ts
// @require core/variables.ts

type MapCallback<T> = ( this: T, index: number, ele: T ) => Ele;

interface Cash {
  map ( callback: MapCallback<EleLoose> ): Cash;
}

Cash.prototype.map = function ( this: Cash, callback: MapCallback<EleLoose> ) {
  return cash ( map.call ( this, ( ele: Ele, i: number ) => callback.call ( ele, i, ele ) ) );
};
