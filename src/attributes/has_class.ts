
// @require core/cash.ts
// @require core/get_split_values.ts
// @require collection/each.ts

interface Cash {
  hasClass ( classes: string ): boolean;
}

Cash.prototype.hasClass = function ( this: Cash, cls: string ) {

  const classes = getSplitValues ( cls );

  let check = false;

  if ( classes.length ) {
    this.each ( ( i, ele ) => {
      check = ele.classList.contains ( classes[0] );
      return !check;
    });
  }

  return check;

};
