
// @require core/cash.ts
// @require ./helpers/insert_selectors.ts

interface Cash {
  prependTo ( selector: Selector ): this;
}

fn.prependTo = function ( this: Cash, selector: Selector ) {

  return insertSelectors ( arguments, this, true, true, true, false, false, true );

};
