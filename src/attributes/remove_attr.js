
// @require collection/each.js

fn.removeAttr = function ( attr ) {
  return this.each ( ( i, ele ) => {
    if ( ele.removeAttribute ) {
      ele.removeAttribute ( attr );
    } else {
      delete ele[attr];
    }
  });
};
