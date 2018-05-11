
// @require core/index.js
// @require data/helpers/get_data.js
// @require ./has_namespaces.js
// @require ./parse_event_name.js
// @require ./remove_event_listeners.js

function removeEvent ( ele, name, namespaces, callback ) {

  const events = getData ( ele, eventsNamespace );

  if ( !events ) return;

  if ( !name ) {

    if ( !namespaces || !namespaces.length ) {

      for ( name in events ) {

        removeEventListeners ( events, ele, name );

      }

    } else {

      for ( name in events ) {

        removeEvent ( ele, name, namespaces, callback );

      }

    }

  } else {

    const eventCache = events[name];

    if ( !eventCache ) return;

    if ( callback ) callback.guid = ( callback.guid || guid++ );

    events[name] = eventCache.filter ( ([ ns, cb ]) => {

      if ( ( callback && cb.guid !== callback.guid ) || !hasNamespaces ( ns, namespaces ) ) return true;

      ele.removeEventListener ( name, cb );

    });

  }

}
