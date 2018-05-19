
// @require core/cash.js
// @require collection/filter.js
// @require ./is.js
// @require ./parent.js

fn.closest = function ( selector ) {

  if ( !selector || !this[0] ) return cash ();

  if ( this.is ( selector ) ) return this.filter ( selector );

  return this.parent ().closest ( selector );

};
