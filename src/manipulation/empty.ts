
// @require core/cash.ts

interface Cash {
  empty (): this;
}

Cash.prototype.empty = function ( this: Cash ) {

  const ele = this[0];

  if ( ele ) {

    while ( ele.firstChild ) {

      ele.removeChild ( ele.firstChild );

    }

  }

  return this;

};
