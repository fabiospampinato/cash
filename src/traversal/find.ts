
// @require core/cash.ts
// @require core/unique.ts
// @require core/find.ts
// @require core/variables.ts

interface Cash {
  find ( selector: string ): Cash;
}

Cash.prototype.find = function ( this: Cash, selector: string ) {

  const result: Ele[] = [];

  for ( let i = 0, l = this.length; i < l; i++ ) {
    const found = find ( selector, this[i] );
    if ( found.length ) {
      push.apply ( result, found );
    }
  }

  return cash ( unique ( result ) );

};
