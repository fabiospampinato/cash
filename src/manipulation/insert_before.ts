
// @require core/cash.ts
// @require ./helpers/insert_selectors.ts

interface Cash {
  insertBefore ( selector: Selector ): this;
}

fn.insertBefore = function ( this: Cash, selector: Selector ) {

  return insertSelectors ( arguments, this, true, true );

};
