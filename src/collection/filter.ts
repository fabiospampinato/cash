
// @require core/cash.ts
// @require core/get_compare_function.ts
// @require core/type_checking.ts
// @require core/variables.ts
// @require collection/get.ts

interface Cash {
  filter ( comparator?: Comparator ): Cash;
}

fn.filter = function ( this: Cash, comparator?: Comparator ) {

  const compare = getCompareFunction ( comparator );

  return cash ( filter.call ( this, ( ele: EleLoose, i: number ) => compare.call ( ele, i, ele ) ) );

};
