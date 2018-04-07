
// @require collection/each.js
// @require ./helpers/get_value.js

fn.val = function ( value ) {
  if ( value === undefined ) {
    return this[0] ? getValue ( this[0] ) : undefined;
  } else {
    return this.each ( ele => { ele.value = value } );
  }
};
