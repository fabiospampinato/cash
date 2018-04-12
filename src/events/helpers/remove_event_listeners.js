
// @require core/index.js

function removeEventListeners ( events, ele, name ) {

  each ( events[name], ([ namespaces, callback ]) => { ele.removeEventListener ( name, callback ) } );

  delete events[name];

}
