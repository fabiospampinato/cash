
// @require collection/each.js

fn.is = function ( selector ) {

  if ( !selector || !this[0] ) return false;

  const comparator = getCompareFunction ( selector );

  let match = false;

  this.each ( ( i, ele ) => {
    match = comparator ( i, ele, selector );
    return !match;
  });

  return match;

};
