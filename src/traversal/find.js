
// @require core/cash.js
// @require core/unique.js
// @require core/find.js
// @require core/variables.js

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
