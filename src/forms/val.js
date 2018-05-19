
// @require core/cash.js
// @require collection/each.js
// @require ./helpers/get_value.js

fn.val = function ( value ) {

  if ( value === undefined ) return this[0] && getValue ( this[0] );

  return this.each ( ( i, ele ) => { ele.value = value } ); //TODO: Does it work for select[multiple] too?

};
