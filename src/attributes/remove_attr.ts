
// @require core/cash.ts
// @require core/each.ts
// @require core/get_split_values.ts
// @require collection/each.ts

interface Cash {
  removeAttr ( attrs: string ): this;
}

fn.removeAttr = function ( this: Cash, attr: string ) {

  const attrs = getSplitValues ( attr );

  return each ( this, ( i, ele ) => {

    if ( !isElement ( ele ) ) return;

    each ( attrs, ( i, a ) => {

      ele.removeAttribute ( a );

    });

  });

};
