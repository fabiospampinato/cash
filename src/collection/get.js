
// @require core/cash.js
// @require core/variables.js

fn.get = function ( index ) {

  if ( index === undefined ) return slice.call ( this );

  return this[index < 0 ? index + this.length : index];

};
