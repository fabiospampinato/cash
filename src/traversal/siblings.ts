
// @require core/cash.ts
// @require collection/filter.ts
// @require ./children.ts
// @require ./parent.ts

fn.siblings = function () {

  const ele = this[0];

  return this.parent ().children ().filter ( ( i, child ) => child !== ele );

};
