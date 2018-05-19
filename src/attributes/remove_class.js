
// @require core/cash.js
// @require ./attr.js
// @require ./toggle_class.js

fn.removeClass = function ( cls ) {
  return !arguments.length ? this.attr ( 'class', '' ) : this.toggleClass ( cls, false );
};
