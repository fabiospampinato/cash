
// @require core/cash.js
// @require core/get_split_values.js
// @require collection/each.js

fn.removeAttr = function ( attr ) {

  const attrs = getSplitValues ( attr );

  if ( !attrs.length ) return this;

  return this.each ( ( i, ele ) => {
    each ( attrs, a => {
      ele.removeAttribute ( a );
    });
  });

};
