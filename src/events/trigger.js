
// @require collection/each.js
// @require ./helpers/add_event_methods.js
// @require ./helpers/parse_event_name.js

fn.trigger = function ( eventFullName, data ) {

  let evt = eventFullName;

  if ( isString ( eventFullName ) ) {

    const [name, namespaces] = parseEventName ( eventFullName );

    evt = doc.createEvent ( 'HTMLEvents' );
    evt.initEvent ( name, true, false );
    evt.namespace = namespaces.join ( eventsNamespacesSeparator );

  }

  evt.data = data;

  addEventMethods ( evt );

  return this.each ( ( i, ele ) => { ele.dispatchEvent ( evt ) } ); //FIXME: Maybe the return value of `dispatchEvent` is actually useful here?

};
