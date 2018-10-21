
// @require core/cash.ts
// @require collection/filter.ts
// @require ./is.ts
// @require ./parent.ts

fn.closest = function ( selector ) {

  if ( !selector || !this[0] ) return cash ();

  if ( this.is ( selector ) ) return this.filter ( selector );

  return this.parent ().closest ( selector );

};
