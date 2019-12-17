
// @require core/cash.ts
// @require core/variables.ts

type MapCallback<T> = ( this: T, index: number, ele: T ) => Ele;

interface Cash {
  map ( callback: MapCallback<EleLoose> ): Cash;
}

fn.map = function ( this: Cash, callback: MapCallback<EleLoose> ) {

  return cash ( map.call ( this, ( ele: EleLoose, i: number ) => callback.call ( ele, i, ele ) ) );

};
