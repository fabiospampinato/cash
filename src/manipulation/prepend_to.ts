
// @require core/cash.ts
// @require core/variables.ts
// @require collection/slice.ts
// @require ./helpers/insert_content.ts

interface Cash {
  prependTo ( selector: Selector ): this;
}

Cash.prototype.prependTo = function ( this: Cash, selector: Selector ) {
  insertContent ( cash ( selector ), reverse.apply ( this.slice () ), true );
  return this;
};
