
// @require collection/each.js

fn.removeProp = function ( prop ) {
  return this.each ( ele => { delete ele[prop] } );
};
