
// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./wrap_all.ts

interface Cash {
  wrap ( selector?: Selector ): this;
}

Cash.prototype.wrap = function ( this: Cash, selector?: Selector ) {

  return this.each ( ( index, ele ) => {

    const wrapper = cash ( selector )[0];

    if ( isWindow ( wrapper ) ) return;

    cash ( ele ).wrapAll ( !index ? wrapper : wrapper.cloneNode ( true ) );

  });

};
