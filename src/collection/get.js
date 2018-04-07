
// @require core/index.js

fn.get = function ( index ) {

  if ( index === undefined ) return slice.call ( this );

  return ( index < 0 ? this[index + this.length] : this[index] );

};
