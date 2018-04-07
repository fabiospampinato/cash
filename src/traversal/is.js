
// @require collection/each.js

fn.is = function ( selector ) {

  if ( !selector || !this[0] ) return false;

  const comparator = getCompareFunction ( selector );

  let match = false;

  this.each ( ele => {
    match = comparator ( ele, selector );
    return !match;
  });

  return match;

};
