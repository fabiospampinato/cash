
// @require core/cash.ts
// @require core/unique.ts
// @require collection/each.ts

interface Cash {
  parent (): Cash;
}

Cash.prototype.parent = function ( this: Cash ) {

  const result: Ele[] = [];

  this.each ( ( i, ele ) => {
    if ( ele && ele.parentNode ) {
      result.push ( ele.parentNode );
    }
  });

  return cash ( unique ( result ) );

};
