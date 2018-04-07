
// @require core/index.js
// @require data/helpers/get_data.js
// @require ./remove_event_listeners.js

function removeEvent ( ele, eventName, callback ) {

  const events = getData ( ele, eventsNamespace );

  if ( !events ) return;

  if ( eventName === undefined ) {

    for ( eventName in events ) {
      removeEventListeners ( events, ele, eventName );
    }

  } else {

    const eventCache = events[eventName];

    if ( !eventCache ) return;

    if ( callback ) {

      callback.guid = ( callback.guid || guid++ );

      events[eventName] = eventCache.filter ( cb => {
        if ( cb.guid !== callback.guid ) return true;
        ele.removeEventListener ( eventName, cb );
      });

    } else {

      removeEventListeners ( events, ele, eventName );

    }

  }

}
