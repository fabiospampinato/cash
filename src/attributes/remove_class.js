
// @require ./toggle_class.js

fn.removeClass = function ( cls ) {
  return this.toggleClass ( cls, false );
};
