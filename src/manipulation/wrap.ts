
// @require core/cash.ts
// @require collection/each.ts
// @require ./wrap_all.ts

interface Cash {
  wrap ( selector?: Selector ): this;
}

fn.wrap = function ( this: Cash, selector?: Selector ) {

  return each ( this, ( i, ele ) => {

    const wrapper = cash ( selector )[0];

    cash ( ele ).wrapAll ( i ? wrapper.cloneNode ( true ) : wrapper );

  });

};
