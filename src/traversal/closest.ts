
// @require core/cash.ts
// @require collection/filter.ts
// @require ./is.ts
// @require ./parent.ts

interface Cash {
  closest ( selector: string ): Cash;
}

Cash.prototype.closest = function ( this: Cash, selector: string ) {

  if ( !selector || !this[0] ) return cash ();

  if ( this.is ( selector ) ) return this.filter ( selector );

  return this.parent ().closest ( selector );

};
