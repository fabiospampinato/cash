
// @require core/cash.ts
// @require core/get_compare_function.ts
// @require collection/filter.ts

fn.not = function ( selector ) {

  if ( !selector || !this[0] ) return this;

  const comparator = getCompareFunction ( selector );

  return this.filter ( ( i, ele ) => !comparator ( i, ele, selector ) );

};
