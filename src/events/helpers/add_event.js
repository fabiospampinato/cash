
// @require core/index.js
// @require data/helpers/get_data.js
// @require data/helpers/set_data.js

function addEvent ( ele, eventName, callback ) {

  callback.guid = ( callback.guid || guid++ );

  const eventCache = getData ( ele, eventsNamespace ) || setData ( ele, eventsNamespace, {} );

  eventCache[eventName] = ( eventCache[eventName] || [] );
  eventCache[eventName].push ( callback );

  ele.addEventListener ( eventName, callback );

}
