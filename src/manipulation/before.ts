
// @require core/cash.ts
// @require core/each.ts
// @require ./insert_before.ts

interface Cash {
  before ( ...selectors: Selector[] ): this;
}

Cash.prototype.before = function ( this: Cash ) {
  each ( arguments, ( selector: Selector ) => {
    cash ( selector ).insertBefore ( this );
  });
  return this;
};
