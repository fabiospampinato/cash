
// @require collection/each.js
// @require ./helpers/get_classes.js
// @require ./helpers/add_class.js

fn.addClass = function ( cls ) {

  const classes = getClasses ( cls );

  if ( !classes ) return this;

  return this.each ( ele => {
    each ( classes, c => addClass ( ele, c ) );
  });

};
