
// @require core/cash.ts
// @require core/get_compare_function.ts
// @require collection/filter.ts

interface Cash {
  not ( comparator: Comparator ): Cash;
}

Cash.prototype.not = function ( this: Cash, comparator: Comparator ) {

  if ( !comparator || !this[0] ) return this;

  const compare = getCompareFunction ( comparator );

  return this.filter ( ( i, ele ) => !compare.call ( ele, i, ele ) );

};
