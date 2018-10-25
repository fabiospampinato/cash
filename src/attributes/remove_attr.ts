
// @require core/cash.ts
// @require core/get_split_values.ts
// @require collection/each.ts

interface Cash {
  removeAttr ( attrs: string ): this;
}

Cash.prototype.removeAttr = function ( this: Cash, attr: string ) {

  const attrs = getSplitValues ( attr );

  if ( !attrs.length ) return this;

  return this.each ( ( i, ele ) => {
    each ( attrs, ( i, a ) => {
      ele.removeAttribute ( a );
    });
  });

};
