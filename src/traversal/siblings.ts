
// @require core/cash.ts
// @require core/filtered.ts
// @require core/unique.ts
// @require core/variables.ts
// @require collection/each.ts
// @require ./children.ts
// @require ./parent.ts

interface Cash {
  siblings ( comparator?: Comparator ): Cash;
}

Cash.prototype.siblings = function ( this: Cash, comparator?: Comparator ) {

  const result: Ele[] = [];

  this.each ( ( i, ele ) => {

    push.apply ( result, cash ( ele ).parent ().children ( ( ci, child ) => child !== ele ) );

  });

  return filtered ( cash ( unique ( result ) ), comparator );

};
