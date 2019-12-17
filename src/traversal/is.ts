
// @require core/cash.ts
// @require core/get_compare_function.ts
// @require core/variables.ts
// @require collection/each.ts

interface Cash {
  is ( comparator?: Comparator ): boolean;
}

fn.is = function ( this: Cash, comparator?: Comparator ) {

  const compare = getCompareFunction ( comparator );

  return some.call ( this, ( ele: EleLoose, i: number ) => compare.call ( ele, i, ele ) );

};
