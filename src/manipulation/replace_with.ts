
// @require core/cash.ts
// @require ./before.ts
// @require ./remove.ts

interface Cash {
  replaceWith ( selector: Selector ): this;
}

Cash.prototype.replaceWith = function ( this: Cash, selector: Selector ) {
  return this.before ( selector ).remove ();
};
