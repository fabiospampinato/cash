
// @require core/index.js
// @require data/helpers/get_data.js
// @require data/helpers/set_data.js

function addEvent ( ele, name, namespaces, callback ) {

  callback.guid = ( callback.guid || guid++ );

  const eventCache = getData ( ele, eventsNamespace ) || setData ( ele, eventsNamespace, {} );

  eventCache[name] = ( eventCache[name] || [] );
  eventCache[name].push ([ namespaces, callback ]);

  ele.addEventListener ( name, callback );

}
