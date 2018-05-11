
// @require collection/filter.js

fn.not = function ( selector ) {

  if ( !selector || !this[0] ) return this;

  const comparator = getCompareFunction ( selector );

  return this.filter ( ( i, ele ) => !comparator ( i, ele, selector ) );

};
