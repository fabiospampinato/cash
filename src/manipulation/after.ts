
// @require core/cash.ts
// @require ./helpers/insert_selectors.ts

interface Cash {
  after ( ...selectors: Selector[] ): this;
}

fn.after = function ( this: Cash ) {

  return insertSelectors ( arguments, this, false, false, false, true, true );

};
