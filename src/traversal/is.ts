
// @require core/cash.ts
// @require core/get_compare_function.ts
// @require collection/each.ts

interface Cash {
  is ( comparator: Comparator ): boolean;
}

Cash.prototype.is = function ( this: Cash, comparator: Comparator ) {

  if ( !comparator || !this[0] ) return false;

  const compare = getCompareFunction ( comparator );

  let check = false;

  this.each ( ( i, ele ) => {
    check = compare.call ( ele, i, ele );
    return !check;
  });

  return check;

};
