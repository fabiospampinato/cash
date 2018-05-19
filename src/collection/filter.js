
// @require core/cash.js
// @require core/get_compare_function.js
// @require core/type_checking.js
// @require core/variables.js
// @require collection/get.js

fn.filter = function ( selector ) {

  if ( !selector ) return cash ();

  const comparator = isFunction ( selector ) ? selector : getCompareFunction ( selector );

  return cash ( filter.call ( this, ( ele, i ) => comparator.call ( ele, i, ele, selector ) ) );

};
