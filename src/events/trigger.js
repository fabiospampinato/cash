
// @require collection/each.js
// @require ./helpers/variables.js
// @require ./helpers/parse_event_name.js

fn.trigger = function ( eventFullName, data ) {

  let evt = eventFullName;

  if ( isString ( eventFullName ) ) {

    const [name, namespaces] = parseEventName ( eventFullName );

    evt = doc.createEvent ( 'HTMLEvents' );
    evt.initEvent ( name, true, true );
    evt.namespace = namespaces.join ( eventsNamespacesSeparator );

  }

  evt.data = data;

  return this.each ( ( i, ele ) => { ele.dispatchEvent ( evt ) } );

};
