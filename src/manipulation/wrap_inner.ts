
// @require core/cash.ts
// @require collection/first.ts
// @require manipulation/append_to.ts

interface Cash {
  wrapInner ( selector?: Selector ): this;
}

fn.wrapInner = function ( this: Cash, selector?: Selector ) {

  return this.each ( ( i, ele ) => {

    const $ele = cash ( ele );
    const contents = $ele.contents ();

    contents.length ? contents.wrapAll ( selector ) : $ele.append ( selector );

  });

};
