
// @require collection/each.js
// @require ./helpers/get_classes.js
// @require ./attr.js

fn.removeClass = function ( cls ) {

  if ( !arguments.length ) return this.attr ( 'class', '' );

  const classes = getClasses ( cls );

  if ( !classes ) return this;

  return this.each ( ( i, ele ) => {
    each ( classes, c => ele.classList.remove ( c ) );
  });

};
