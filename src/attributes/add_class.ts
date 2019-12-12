
// @require core/cash.ts
// @require ./toggle_class.ts

interface Cash {
  addClass ( classes: string ): this;
}

fn.addClass = function ( this: Cash, cls: string ) {

  return this.toggleClass ( cls, true );

};
