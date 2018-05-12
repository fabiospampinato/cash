
// @require collection/each.js
// @require ./helpers/get_classes.js

fn.hasClass = function ( cls ) {

  const classes = getClasses ( cls );

  if ( !classes || !classes.length ) return false;

  let check = false;

  this.each ( ( i, ele ) => {
    check = ele.classList.contains ( classes[0] );
    return !check;
  });

  return check;

};
