
// @require core/cash.js
// @require core/find.js
// @require core/type_checking.js
// @require collection/filter.js

fn.has = function ( selector ) {

  const comparator = isString ( selector )
                       ? ( i, ele ) => !!find ( selector, ele ).length
                       : ( i, ele ) => ele.contains ( selector );

  return this.filter ( comparator );

};
