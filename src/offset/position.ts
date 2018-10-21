
// @require core/cash.ts

interface Cash {
  position (): undefined | {
    top: number,
    left: number
  };
}

Cash.prototype.position = function ( this: Cash ) {

  const ele = this[0];

  if ( !ele ) return;

  return {
    left: ele.offsetLeft,
    top: ele.offsetTop
  };

};
