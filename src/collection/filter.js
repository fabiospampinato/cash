
// @require collection/get.js

fn.filter = function ( selector ) {

  if ( !selector ) return this;

  const comparator = isFunction ( selector ) ? selector : getCompareFunction ( selector );

  return cash ( this.get ().filter ( ele => comparator ( ele, selector ) ) );

};
