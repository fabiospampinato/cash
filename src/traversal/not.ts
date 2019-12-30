
// @require core/cash.ts
// @require core/get_compare_function.ts
// @require core/type_checking.ts
// @require collection/filter.ts

interface Cash {
  not ( comparator?: Comparator ): Cash;
}

fn.not = function ( this: Cash, comparator?: Comparator ) {

  const compare = getCompareFunction ( comparator );

  return this.filter ( ( i: number, ele: EleLoose ) => isElement ( ele ) && !compare.call ( ele, i, ele ) );

};
