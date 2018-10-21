
// @require core/cash.ts
// @require core/get_compare_function.ts
// @require collection/each.ts

fn.is = function ( selector ) {

  if ( !selector || !this[0] ) return false;

  const comparator = getCompareFunction ( selector );

  let check = false;

  this.each ( ( i, ele ) => {
    check = comparator ( i, ele, selector );
    return !check;
  });

  return check;

};
