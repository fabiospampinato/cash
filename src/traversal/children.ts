
// @require core/cash.ts
// @require core/matches.ts
// @require core/unique.ts
// @require collection/each.ts
// @require collection/filter.ts

fn.children = function ( selector ) {

  let result = [];

  this.each ( ( i, ele ) => { push.apply ( result, ele.children ) } );

  result = cash ( unique ( result ) );

  if ( !selector ) return result;

  return result.filter ( ( i, ele ) => matches ( ele, selector ) );

};
