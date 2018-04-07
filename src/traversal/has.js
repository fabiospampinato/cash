
// @require collection/filter.js

fn.has = function ( selector ) {

  const comparator = isString ( selector )
                       ? ele => !!find ( selector, ele ).length
                       : ele => ele.contains ( selector );

  return this.filter ( comparator );

};
