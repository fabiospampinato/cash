
// @require core/cash.ts
// @require core/type_checking.ts
// @require core/variables.ts

const docEle = doc.documentElement;

interface Cash {
  offset (): undefined | {
    top: number,
    left: number
  };
}

Cash.prototype.offset = function ( this: Cash ) {

  const ele = this[0];

  if ( !isElement ( ele ) ) return;

  const rect = ele.getBoundingClientRect ();

  return {
    top: rect.top + win.pageYOffset - docEle.clientTop,
    left: rect.left + win.pageXOffset - docEle.clientLeft
  };

};
