
// @require core/cash.ts
// @require ./replace_with.ts

interface Cash {
  replaceAll ( selector: Selector ): this;
}

Cash.prototype.replaceAll = function ( this: Cash, selector: Selector ) {
  cash ( selector ).replaceWith ( this );
  return this;
};
