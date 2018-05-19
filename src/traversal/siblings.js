
// @require core/cash.js
// @require collection/filter.js
// @require ./children.js
// @require ./parent.js

fn.siblings = function () {

  const ele = this[0];

  return this.parent ().children ().filter ( ( i, child ) => child !== ele );

};
