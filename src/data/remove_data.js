
// @require collection/each.js
// @require ./helpers/remove_data.js

fn.removeData = function ( key ) {
  return this.each ( ele => removeData ( ele, key ) );
};
