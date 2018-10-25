
// @require core/cash.ts

interface Cash {
  next (): Cash;
}

Cash.prototype.next = function ( this: Cash ) {

  let result: Ele[] = [];

  this.each ( ( i, ele ) => {
    if ( ele.nextElementSibling ) {
      result.push ( ele.nextElementSibling ) ;
    }
  });

  return cash ( unique ( result ) );

};
