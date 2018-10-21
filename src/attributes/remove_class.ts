
// @require core/cash.ts
// @require ./attr.ts
// @require ./toggle_class.ts

fn.removeClass = function ( cls ) {
  return !arguments.length ? this.attr ( 'class', '' ) : this.toggleClass ( cls, false );
};
