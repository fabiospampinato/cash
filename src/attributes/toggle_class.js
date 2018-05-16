
// @require collection/each.js
// @require ./attr.js

fn.toggleClass = function ( cls, force ) {

  const classes = getSplitValues ( cls ),
        isForce = ( force !== undefined );

  if ( !classes.length ) return this;

  return this.each ( ( i, ele ) => {
    each ( classes, c => {
      if ( isForce ) {
        force ? ele.classList.add ( c ) : ele.classList.remove ( c );
      } else {
        ele.classList.toggle ( c );
      }
    });
  });

};
