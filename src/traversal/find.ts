
// @require core/cash.ts
// @require core/unique.ts
// @require core/find.ts
// @require core/variables.ts

fn.find = function ( selector ) {

  const result = [];

  for ( let i = 0, l = this.length; i < l; i++ ) {
    const found = find ( selector, this[i] );
    if ( found.length ) {
      push.apply ( result, found );
    }
  }

  return cash ( result.length && unique ( result ) );

};
