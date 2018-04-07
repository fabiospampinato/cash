
// @require collection/each.js

fn.detach = function () {
  return this.each ( ele => { ele.parentNode.removeChild ( ele ) } );
};
