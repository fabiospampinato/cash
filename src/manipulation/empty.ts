
// @require core/cash.ts
// @require core/type_checking.ts

interface Cash {
  empty (): this;
}

Cash.prototype.empty = function ( this: Cash ) {

  return this.each ( ( i, ele ) => {

    if ( !isElement ( ele ) ) return;

    while ( ele.firstChild ) {

      ele.removeChild ( ele.firstChild );

    }

  });

};
