
// @require core/cash.ts
// @require core/each.ts
// @require ./helpers/insert_content.ts

interface Cash {
  append ( ...selectors: Selector[] ): this;
}

Cash.prototype.append = function ( this: Cash ) {
  each ( arguments, ( selector: Selector ) => {
    insertContent ( this, cash ( selector ) );
  });
  return this;
};
