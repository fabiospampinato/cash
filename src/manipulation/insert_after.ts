
// @require core/cash.ts
// @require ./helpers/insert_selectors.ts

interface Cash {
  insertAfter ( selector: Selector ): this;
}

fn.insertAfter = function ( this: Cash, selector: Selector ) {

  return insertSelectors ( arguments, this, true, false, false, false, false, true );

};
