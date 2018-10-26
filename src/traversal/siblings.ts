
// @require core/cash.ts
// @require core/filtered.ts
// @require collection/filter.ts
// @require ./children.ts
// @require ./parent.ts

interface Cash {
  siblings ( comparator?: Comparator ): Cash;
}

Cash.prototype.siblings = function ( this: Cash, comparator?: Comparator ) {

  const ele = this[0];

  return filtered ( this.parent ().children ().filter ( ( i, child ) => child !== ele ), comparator );

};
