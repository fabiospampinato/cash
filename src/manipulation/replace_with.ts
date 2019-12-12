
// @require core/cash.ts
// @require ./before.ts
// @require ./remove.ts

interface Cash {
  replaceWith ( selector: Selector ): this;
}

fn.replaceWith = function ( this: Cash, selector: Selector ) {

  return this.before ( selector ).remove ();

};
