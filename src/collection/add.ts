
// @require core/cash.ts
// @require core/unique.ts
// @require ./get.ts

interface Cash {
  add ( selector: Selector, context?: Context ): Cash;
}

fn.add = function ( this: Cash, selector: Selector, context?: Context ) {

  return cash ( unique ( this.get ().concat ( cash ( selector, context ).get () ) ) );

};
