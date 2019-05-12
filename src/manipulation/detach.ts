
// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts

interface Cash {
  detach (): this;
}

Cash.prototype.detach = function ( this: Cash ) {
  return this.each ( ( i, ele ) => {
    if ( isElement ( ele ) && ele.parentNode ) {
      ele.parentNode.removeChild ( ele )
    }
  });
};
