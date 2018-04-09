
// @require collection/each.js
// @require ./helpers/add_class.js
// @require ./helpers/get_classes.js
// @require ./helpers/has_class.js
// @require ./helpers/remove_class.js
// @require ./add_class.js
// @require ./remove_class.js

fn.toggleClass = function ( cls, force ) {

  if ( force !== undefined ) return this[force ? 'addClass' : 'removeClass']( cls );

  const classes = getClasses ( cls );

  if ( !classes ) return this;

  return this.each ( ( i, ele ) => {
    each ( classes, c => {
      if ( hasClass ( ele, c ) ) {
        removeClass ( ele, c );
      } else {
        addClass ( ele, c );
      }
    });
  });

};
