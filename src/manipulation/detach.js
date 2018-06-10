
// @require core/cash.js
// @require collection/each.js

fn.detach = function () {
  return this.each ( ( i, ele ) => {
    if ( ele.parentNode ) {
      ele.parentNode.removeChild ( ele )
    }
  });
};
