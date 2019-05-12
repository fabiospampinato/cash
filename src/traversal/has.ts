
// @require core/cash.ts
// @require core/find.ts
// @require core/type_checking.ts
// @require collection/filter.ts

interface Cash {
  has ( selector: string | HTMLElement ): Cash;
}

Cash.prototype.has = function ( this: Cash, selector: string | HTMLElement ) {

  const comparator = isString ( selector )
                       ? ( i: number, ele: Ele ) => !!find ( selector, ele ).length
                       : ( i: number, ele: Ele ) => ele.contains ( selector );

  return this.filter ( comparator );

};
