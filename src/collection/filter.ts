
// @require core/cash.ts
// @require core/get_compare_function.ts
// @require core/type_checking.ts
// @require core/variables.ts
// @require collection/get.ts

interface Cash {
  filter ( comparator: Comparator ): Cash;
}

Cash.prototype.filter = function ( this: Cash, comparator: Comparator ) {

  if ( !comparator ) return cash ();

  const compare = getCompareFunction ( comparator );

  return cash ( filter.call ( this, ( ele, i ) => compare.call ( ele, i, ele ) ) );

};
