
// @require core/cash.ts
// @require collection/each.ts
// @require ./helpers/remove_data.ts

fn.removeData = function ( key ) {
  return this.each ( ( i, ele ) => removeData ( ele, key ) );
};
