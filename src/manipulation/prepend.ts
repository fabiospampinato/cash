
// @require core/cash.ts
// @require core/each.ts
// @require ./helpers/insert_content.ts

interface Cash {
  prepend ( ...selectors: Selector[] ): this;
}

Cash.prototype.prepend = function ( this: Cash ) {
  each ( arguments, ( i, selector: Selector ) => {
    insertContent ( this, cash ( selector ), true );
  });
  return this;
};
