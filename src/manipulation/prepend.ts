
// @require core/cash.ts
// @require ./helpers/insert_selectors.ts

interface Cash {
  prepend ( ...selectors: Selector[] ): this;
}

fn.prepend = function ( this: Cash ) {

  return insertSelectors ( arguments, this, false, true, true, true, true );

};
