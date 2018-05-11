
// @require collection/each.js
// @require ./helpers/parse_event_name.js
// @require ./helpers/remove_event.js

fn.off = function ( eventFullName, callback ) {

  if ( eventFullName === undefined ) {

    this.each ( ( i, ele ) => removeEvent ( ele ) );

  } else {

    each ( eventFullName.split ( eventsSeparatorRe ), eventFullName => {

      const [name, namespaces] = parseEventName ( eventFullName );

      this.each ( ( i, ele ) => removeEvent ( ele, name, namespaces, callback ) );

    });

  }

  return this;

};
