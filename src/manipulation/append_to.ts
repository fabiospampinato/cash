
// @require core/cash.ts
// @require ./helpers/insert_selectors.ts

interface Cash {
  appendTo ( selector: Selector ): this;
}

fn.appendTo = function ( this: Cash, selector: Selector ) {

  return insertSelectors ( arguments, this, true, false, true );

};
