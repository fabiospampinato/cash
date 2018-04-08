
// @require attributes/remove_attr.js
// @require ./get_data_cache.js

function removeData ( ele, key ) {

  const cache = getDataCache ( ele );

  if ( key in cache ) {
    cache[key] = undefined;
  } else {
    if ( ele.dataset ) {
      delete ele.dataset[key];
    } else {
      cash ( ele ).removeAttr ( `data-${name}` );
    }
  }

}
