
// @require core/index.js

function removeEventListeners ( events, ele, eventName ) {

  each ( events[eventName], callback => { ele.removeEventListener ( eventName, callback ) } );

  delete events[eventName];

}
