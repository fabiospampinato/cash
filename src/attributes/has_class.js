
// @require collection/each.js
// @require ./helpers/get_classes.js
// @require ./helpers/has_class.js

fn.hasClass = function ( cls ) {

  const classes = getClasses ( cls );

  if ( !classes || !classes.length ) return false;

  let check = false;

  this.each ( ele => {
    check = hasClass ( ele, classes[0] );
    return !check;
  });

  return check;

};
