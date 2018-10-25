
// @require core/cash.ts
// @require core/unique.ts
// @require core/variables.ts
// @require collection/each.ts
// @require collection/filter.ts

interface Cash {
  children ( selector?: string ): Cash;
}

Cash.prototype.children = function ( this: Cash, selector?: string ) {

  let result: Ele[] | Cash = [];

  this.each ( ( i, ele ) => { push.apply ( result, ele.children ) } );

  result = cash ( unique ( result ) );

  if ( !selector ) return result;

  return result.filter ( selector );

};
