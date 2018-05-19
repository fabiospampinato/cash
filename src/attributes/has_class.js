
// @require core/cash.js
// @require core/get_split_values.js
// @require collection/each.js

fn.hasClass = function ( cls ) {

  const classes = getSplitValues ( cls );

  let check = false;

  if ( classes.length ) {
    this.each ( ( i, ele ) => {
      check = ele.classList.contains ( classes[0] );
      return !check;
    });
  }

  return check;

};
