
// @require core/cash.ts
// @require core/each.ts
// @require collection/first.ts
// @require manipulation/append_to.ts

interface Cash {
  wrapInner ( selector?: Selector ): this;
}

fn.wrapInner = function ( this: Cash, selector?: Selector ) {

  return each ( this, ( i, ele ) => {

    const $ele = cash ( ele );
    const contents = $ele.contents ();

    contents.length ? contents.wrapAll ( selector ) : $ele.append ( selector );

  });

};
