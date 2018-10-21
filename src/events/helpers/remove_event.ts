
// @require core/guid.ts
// @require ./get_events_cache.ts
// @require ./has_namespaces.ts
// @require ./parse_event_name.ts
// @require ./remove_event_listeners.ts

function removeEvent ( ele: Ele, name?: string, namespaces?: string[], callback?: Function ): void {

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

    if ( callback ) callback['guid'] = ( callback['guid'] || guid++ );

    cache[name] = eventCache.filter ( ([ ns, cb ]) => {

      if ( ( callback && cb['guid'] !== callback['guid'] ) || !hasNamespaces ( ns, namespaces ) ) return true;

      ele.removeEventListener ( name, cb );

    });

  }

}
