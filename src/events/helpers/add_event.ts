
// @require core/guid.ts
// @require events/helpers/get_events_cache.ts

function addEvent ( ele: Ele, name: string, namespaces: string[], callback: Function ): void {

  callback['guid'] = ( callback['guid'] || guid++ );

  const eventCache = getEventsCache ( ele );

  eventCache[name] = ( eventCache[name] || [] );
  eventCache[name].push ([ namespaces, callback ]);

  ele.addEventListener ( name, callback as EventListener ); //TSC

}
