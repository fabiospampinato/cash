
// @require core/cash.ts
// @require collection/each.ts

fn.detach = function () {
  return this.each ( ( i, ele ) => {
    if ( ele.parentNode ) {
      ele.parentNode.removeChild ( ele )
    }
  });
};
