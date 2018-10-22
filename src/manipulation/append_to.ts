
// @require core/cash.ts
// @require ./helpers/insert_content.ts

interface Cash {
  appendTo ( selector: Selector ): this;
}

Cash.prototype.appendTo = function ( this: Cash, selector: Selector ) {
  insertContent ( cash ( selector ), this );
  return this;
};
