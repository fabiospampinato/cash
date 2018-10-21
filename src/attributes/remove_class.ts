
// @require core/cash.ts
// @require ./attr.ts
// @require ./toggle_class.ts

interface Cash {
  removeClass ( classes?: string ): this;
}

Cash.prototype.removeClass = function ( this: Cash, cls?: string ) {
  return !arguments.length ? this.attr ( 'class', '' ) : this.toggleClass ( cls as string, false );
};
