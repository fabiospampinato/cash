
// @require core/cash.ts
// @require ./helpers/insert_selectors.ts

interface Cash {
  append ( ...selectors: Selector[] ): this;
}

fn.append = function ( this: Cash ) {

  return insertSelectors ( arguments, this, false, false, true );

};
