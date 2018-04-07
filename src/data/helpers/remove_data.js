
// @require attributes/remove_attr.js
// @require ./get_data_cache.js

function removeData ( ele, key ) {

  const cache = getDataCache ( ele );

  if ( cache ) { //FIXME: An object is always returned, what's the point of this? Maybe we should check if `key in cache`. Check how jQuery behaves here
    delete cache[key];
  } else if ( ele.dataset ) {
    delete ele.dataset[key];
  } else {
    cash ( ele ).removeAttr ( `data-${name}` );
  }

}
