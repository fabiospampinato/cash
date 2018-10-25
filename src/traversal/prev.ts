
// @require core/cash.ts

interface Cash {
  prev (): Cash;
}

Cash.prototype.prev = function ( this: Cash ) {

  let result: Ele[] = [];

  this.each ( ( i, ele ) => {
    if ( ele.previousElementSibling ) {
      result.push ( ele.previousElementSibling ) ;
    }
  });

  return cash ( unique ( result ) );

};
