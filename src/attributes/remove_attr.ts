
// @require core/cash.ts
// @require core/get_split_values.ts
// @require collection/each.ts

fn.removeAttr = function ( attr ) {

  const attrs = getSplitValues ( attr );

  if ( !attrs.length ) return this;

  return this.each ( ( i, ele ) => {
    each ( attrs, a => {
      ele.removeAttribute ( a );
    });
  });

};
