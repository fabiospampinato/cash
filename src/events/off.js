
// @require collection/each.js
// @require ./helpers/remove_event.js

fn.off = function ( eventName, callback ) {

  if ( eventName === undefined ) {

    this.each ( ele => removeEvent ( ele ) );

  } else {

    each ( eventName.split ( eventsSeparatorRe ), eventName => {
      this.each ( ele => removeEvent ( ele, eventName, callback ) );
    });

  }

  return this;

};
