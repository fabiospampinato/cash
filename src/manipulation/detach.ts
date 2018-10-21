
// @require core/cash.ts
// @require collection/each.ts

interface Cash {
  detach (): this;
}

Cash.prototype.detach = function ( this: Cash ) {
  return this.each ( ( i, ele ) => {
    if ( ele.parentNode ) {
      ele.parentNode.removeChild ( ele )
    }
  });
};
