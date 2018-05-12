
// @require collection/each.js
// @require ./helpers/get_classes.js

fn.addClass = function ( cls ) {

  const classes = getClasses ( cls );

  if ( !classes ) return this;

  return this.each ( ( i, ele ) => {
    each ( classes, c => ele.classList.add ( c ) );
  });

};
