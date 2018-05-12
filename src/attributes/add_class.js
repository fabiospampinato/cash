
// @require ./toggle_class.js

fn.addClass = function ( cls ) {
  return this.toggleClass ( cls, true );
};
