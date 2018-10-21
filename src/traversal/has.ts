
// @require core/cash.ts
// @require core/find.ts
// @require core/type_checking.ts
// @require collection/filter.ts

fn.has = function ( selector ) {

  const comparator = isString ( selector )
                       ? ( i, ele ) => !!find ( selector, ele ).length
                       : ( i, ele ) => ele.contains ( selector );

  return this.filter ( comparator );

};
