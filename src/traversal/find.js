
// @require collection/each.js
// @require ./has.js

fn.find = function ( selector ) {

  if ( !selector || selector.nodeType ) {
    return cash ( selector && this.has ( selector ).length ? selector : null );
  }

  const result = [];

  this.each ( ( i, ele ) => {
    push.apply ( result, find ( selector, ele ) );
  });

  return cash ( unique ( result ) );

};
