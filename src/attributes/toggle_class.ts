
// @require core/cash.ts
// @require core/each.ts
// @require core/get_split_values.ts
// @require core/type_checking.ts
// @require collection/each.ts

interface Cash {
  toggleClass ( classes: string, force?: boolean ): this;
}

fn.toggleClass = function ( this: Cash, cls: string, force?: boolean ) {

  const classes = getSplitValues ( cls );
  const isForce = !isUndefined ( force );

  return this.each ( ( i, ele ) => {

    if ( !isElement ( ele ) ) return;

    each ( classes, ( i, c ) => {

      if ( isForce ) {

        force ? ele.classList.add ( c ) : ele.classList.remove ( c );

      } else {

        ele.classList.toggle ( c );

      }

    });

  });

};
