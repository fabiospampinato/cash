
// @require core/cash.ts
// @require core/get_split_values.ts
// @require collection/each.ts

interface Cash {
  hasClass ( cls: string ): boolean;
}

Cash.prototype.hasClass = function ( this: Cash, cls: string ) {

  let check = false;

  this.each ( ( i, ele ) => {
    check = ele.classList.contains ( cls );
    return !check;
  });

  return check;

};
