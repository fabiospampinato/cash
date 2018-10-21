
// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts
// @require collection/slice.ts
// @require ./insert_after.ts

interface Cash {
  after ( ...selectors: Selector[] ): this;
}

Cash.prototype.after = function ( this: Cash ) {
  each ( reverse.apply ( arguments ), ( selector: Selector ) => {
    reverse.apply ( cash ( selector ).slice () ).insertAfter ( this );
  });
  return this;
};
