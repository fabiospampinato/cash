
// @require core/cash.ts
// @require collection/filter.ts
// @require ./is.ts
// @require ./parent.ts

interface Cash {
  closest ( comparator: Comparator ): Cash;
}

Cash.prototype.closest = function ( this: Cash, comparator: Comparator ) {

  if ( !comparator || !this[0] ) return cash ();

  const filtered = this.filter ( comparator );

  if ( filtered.length ) return filtered;

  return this.parent ().closest ( comparator );

};
