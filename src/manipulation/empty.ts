
// @require core/cash.ts

interface Cash {
  empty (): this;
}

Cash.prototype.empty = function ( this: Cash ) {

  return this.each ( ( i, ele ) => {

    while ( ele.firstChild ) {

      ele.removeChild ( ele.firstChild );

    }

  });

};
