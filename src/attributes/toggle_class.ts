
// @require core/cash.ts
// @require core/each.ts
// @require core/get_split_values.ts
// @require collection/each.ts

interface Cash {
  toggleClass ( classes: string, force?: boolean ): this;
}

Cash.prototype.toggleClass = function ( this: Cash, cls: string, force?: boolean ) {

  const classes = getSplitValues ( cls ),
        isForce = ( force !== undefined );

  if ( !classes.length ) return this;

  return this.each ( ( i, ele ) => {
    each ( classes, c => {
      if ( isForce ) {
        force ? ele.classList.add ( c ) : ele.classList.remove ( c );
      } else {
        ele.classList.toggle ( c );
      }
    });
  });

};
