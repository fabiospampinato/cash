
// @require collection/each.js
// @require collection/filter.js

fn.children = function ( selector ) {

  let result = [];

  this.each ( ( i, ele ) => { push.apply ( result, ele.children ) } );

  result = cash ( unique ( result ) );

  if ( !selector ) return result;

  return result.filter ( ele => matches ( ele, selector ) );

};
