
// @require core/index.js

fn.get = function ( index ) {

  if ( index === undefined ) return slice.call ( this );

  return this[index < 0 ? index + this.length : index];

};
