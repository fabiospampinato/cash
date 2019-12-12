
// @require core/cash.ts
// @require ./attr.ts
// @require ./toggle_class.ts

interface Cash {
  removeClass ( classes?: string ): this;
}

fn.removeClass = function ( this: Cash, cls?: string ) {

  if ( arguments.length ) return this.toggleClass ( cls, false );

  return this.attr ( 'class', '' );

};
