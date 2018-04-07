
// @require attributes/attr.js
// @require ./get_data_cache.js

function getData ( ele, key ) {

  const cache = getDataCache ( ele );

  if ( !( key in cache ) ) {
    cache[key] = ele.dataset ? ele.dataset[key] : cash ( ele ).attr ( `data-${key}` );
  }

  return cache[key];

}
