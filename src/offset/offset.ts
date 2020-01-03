
// @require core/cash.ts
// @require core/variables.ts

interface Cash {
  offset (): undefined | {
    top: number,
    left: number
  };
}

fn.offset = function ( this: Cash ) {

  const ele = this[0];

  if ( !ele ) return;

  const rect = ele.getBoundingClientRect ();

  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset
  };

};
