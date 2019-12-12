
// @require core/cash.ts
// @require ./helpers/insert_selectors.ts

interface Cash {
  before ( ...selectors: Selector[] ): this;
}

fn.before = function ( this: Cash ) {

  return insertSelectors ( arguments, this, false, true );

};
