
// @require core/cash.ts
// @require core/get_compare_function.ts
// @require core/type_checking.ts
// @require core/variables.ts
// @require collection/get.ts

fn.filter = function ( selector ) {

  if ( !selector ) return cash ();

  const comparator = isFunction ( selector ) ? selector : getCompareFunction ( selector );

  return cash ( filter.call ( this, ( ele, i ) => comparator.call ( ele, i, ele, selector ) ) );

};
