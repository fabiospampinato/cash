
// @require core/cash.ts
// @require collection/filter.ts
// @require ./children.ts
// @require ./parent.ts

interface Cash {
  siblings (): Cash;
}

Cash.prototype.siblings = function ( this: Cash ) {

  const ele = this[0];

  return this.parent ().children ().filter ( ( i, child ) => child !== ele );

};
