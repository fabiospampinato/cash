
// @require core/cash.ts
// @require core/find.ts
// @require core/type_checking.ts
// @require collection/filter.ts

interface Cash {
  has ( selector: string | Node ): Cash;
}

fn.has = function ( this: Cash, selector: string | Node ) {

  const comparator = isString ( selector )
                       ? ( i: number, ele: EleLoose ) => find ( selector, ele ).length
                       : ( i: number, ele: EleLoose ) => ele.contains ( selector );

  return this.filter ( comparator );

};
