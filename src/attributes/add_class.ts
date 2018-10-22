
// @require core/cash.ts
// @require ./toggle_class.ts

interface Cash {
  addClass ( classes: string ): this;
}

Cash.prototype.addClass = function ( this: Cash, cls: string ) {
  return this.toggleClass ( cls, true );
};
