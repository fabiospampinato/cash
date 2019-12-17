
// @require core/guid.ts
// @require events/helpers/get_events_cache.ts

function addEvent ( ele: EleLoose, name: string, namespaces: string[], selector: string, callback: EventCallback ): void {

  callback.guid = callback.guid || cash.guid++;

  const eventCache = getEventsCache ( ele );

  eventCache[name] = ( eventCache[name] || [] );
  eventCache[name].push ([ namespaces, selector, callback ]);

  ele.addEventListener ( name, callback );

}
