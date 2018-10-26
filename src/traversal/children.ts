
// @require core/cash.ts
// @require core/filtered.ts
// @require core/unique.ts
// @require core/variables.ts
// @require collection/each.ts
// @require collection/filter.ts

interface Cash {
  children ( comparator?: Comparator ): Cash;
}

Cash.prototype.children = function ( this: Cash, comparator?: Comparator ) {

  let result: Ele[] | Cash = [];

  this.each ( ( i, ele ) => { push.apply ( result, ele.children ) } );

  return filtered ( cash ( unique ( result ) ), comparator );

};
