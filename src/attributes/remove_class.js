
// @require collection/each.js
// @require ./helpers/get_classes.js
// @require ./helpers/remove_class.js
// @require ./attr.js

fn.removeClass = function ( cls ) {

  if ( cls === undefined ) return this.attr ( 'class', '' );

  const classes = getClasses ( cls );

  if ( !classes ) return this;

  return this.each ( ( i, ele ) => {
    each ( classes, c => removeClass ( ele, c ) );
  });

};
