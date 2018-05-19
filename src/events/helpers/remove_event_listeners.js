
// @require core/each.js

function removeEventListeners ( cache, ele, name ) {

  each ( cache[name], ([ namespaces, callback ]) => { ele.removeEventListener ( name, callback ) } );

  delete cache[name];

}
