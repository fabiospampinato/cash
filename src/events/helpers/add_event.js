
// @require core/guid.js
// @require events/helpers/get_events_cache.js

function addEvent ( ele, name, namespaces, callback ) {

  callback.guid = ( callback.guid || guid++ );

  const eventCache = getEventsCache ( ele );

  eventCache[name] = ( eventCache[name] || [] );
  eventCache[name].push ([ namespaces, callback ]);

  ele.addEventListener ( name, callback );

}
