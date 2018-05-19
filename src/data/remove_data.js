
// @require core/cash.js
// @require collection/each.js
// @require ./helpers/remove_data.js

fn.removeData = function ( key ) {
  return this.each ( ( i, ele ) => removeData ( ele, key ) );
};
