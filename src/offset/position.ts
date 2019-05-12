
// @require core/cash.ts
// @require core/type_checking.ts

interface Cash {
  position (): undefined | {
    top: number,
    left: number
  };
}

Cash.prototype.position = function ( this: Cash ) {

  const ele = this[0];

  if ( !isElement ( ele ) ) return;

  return {
    left: ele.offsetLeft,
    top: ele.offsetTop
  };

};
