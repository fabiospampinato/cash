
// @require core/cash.ts
// @require core/each.ts
// @require ./helpers/insert_content.ts

interface Cash {
  prepend ( ...selectors: Selector[] ): this;
}

Cash.prototype.prepend = function ( this: Cash ) {
  each ( reverse.apply( arguments ), ( i, selector: Selector ) => {
    insertContent ( this, reverse.apply( cash ( selector ) ), true );
  });
  return this;
};
