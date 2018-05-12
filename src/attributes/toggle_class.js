
// @require collection/each.js
// @require ./helpers/get_classes.js
// @require ./add_class.js
// @require ./remove_class.js

fn.toggleClass = function ( cls, force ) {

  if ( force !== undefined ) return this[force ? 'addClass' : 'removeClass']( cls );

  const classes = getClasses ( cls );

  if ( !classes ) return this;

  return this.each ( ( i, ele ) => {
    each ( classes, c => ele.classList.toggle ( c ) );
  });

};
