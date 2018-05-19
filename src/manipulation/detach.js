
// @require core/cash.js
// @require collection/each.js

fn.detach = function () {
  return this.each ( ( i, ele ) => { ele.parentNode.removeChild ( ele ) } );
};
