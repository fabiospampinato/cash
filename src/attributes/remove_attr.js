
// @require collection/each.js

fn.removeAttr = function ( attr ) {
  return this.each ( ele => {
    if ( ele.removeAttribute ) {
      ele.removeAttribute ( attr );
    } else {
      delete ele[attr];
    }
  });
};
