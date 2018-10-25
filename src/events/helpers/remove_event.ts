
// @require ./get_events_cache.ts
// @require ./has_namespaces.ts
// @require ./parse_event_name.ts

function removeEvent ( ele: Ele, name?: string, namespaces?: string[], callback?: Function ): void {

  const cache = getEventsCache ( ele );

  if ( !name ) {

    for ( name in cache ) {

      removeEvent ( ele, name, namespaces, callback );

    }

    delete ele[eventsNamespace];

  } else if ( cache[name] ) {

    cache[name] = cache[name].filter ( ([ ns, cb ]) => {

      if ( ( callback && cb['guid'] !== callback['guid'] ) || !hasNamespaces ( ns, namespaces ) ) return true;

      ele.removeEventListener ( name, cb );

    });

  }

}
