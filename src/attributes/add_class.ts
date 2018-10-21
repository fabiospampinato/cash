
// @require core/cash.ts
// @require ./toggle_class.ts

fn.addClass = function ( cls ) {
  return this.toggleClass ( cls, true );
};
