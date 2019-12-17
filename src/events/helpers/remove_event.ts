
// @require ./get_events_cache.ts
// @require ./has_namespaces.ts
// @require ./parse_event_name.ts

function removeEvent ( ele: EleLoose, name?: string, namespaces?: string[], selector?: string, callback?: EventCallback ): void {

  const cache = getEventsCache ( ele );

  if ( !name ) {

    for ( name in cache ) {

      removeEvent ( ele, name, namespaces, selector, callback );

    }

  } else if ( cache[name] ) {

    cache[name] = cache[name].filter ( ([ ns, sel, cb ]) => {

      if ( ( callback && cb.guid !== callback.guid ) || !hasNamespaces ( ns, namespaces ) || ( selector && selector !== sel ) ) return true;

      ele.removeEventListener ( name, cb );

    });

  }

}
