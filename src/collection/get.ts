
// @require core/cash.ts
// @require core/variables.ts

fn.get = function ( index ) {

  if ( index === undefined ) return slice.call ( this );

  return this[index < 0 ? index + this.length : index];

};
