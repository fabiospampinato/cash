
// @require core/guid.js
// @require ./get_events_cache.js
// @require ./has_namespaces.js
// @require ./parse_event_name.js
// @require ./remove_event_listeners.js

function removeEvent ( ele, name, namespaces, callback ) {

  const cache = getEventsCache ( ele );

  if ( !name ) {

    if ( !namespaces || !namespaces.length ) {

      for ( name in cache ) {

        removeEventListeners ( cache, ele, name );

      }

    } else {

      for ( name in cache ) {

        removeEvent ( ele, name, namespaces, callback );

      }

    }

  } else {

    const eventCache = cache[name];

    if ( !eventCache ) return;

    if ( callback ) callback.guid = ( callback.guid || guid++ );

    cache[name] = eventCache.filter ( ([ ns, cb ]) => {

      if ( ( callback && cb.guid !== callback.guid ) || !hasNamespaces ( ns, namespaces ) ) return true;

      ele.removeEventListener ( name, cb );

    });

  }

}
