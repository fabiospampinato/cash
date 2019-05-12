
// @require core/cash.ts
// @require core/filtered.ts
// @require core/unique.ts
// @require core/variables.ts
// @require collection/each.ts

interface Cash {
  children ( comparator?: Comparator ): Cash;
}

Cash.prototype.children = function ( this: Cash, comparator?: Comparator ) {

  const result: Ele[] = [];

  this.each ( ( i, ele ) => {

    push.apply ( result, ele.children );

  });

  return filtered ( cash ( unique ( result ) ), comparator );

};
