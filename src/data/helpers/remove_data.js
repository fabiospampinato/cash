
// @require attributes/remove_attr.js
// @require ./get_data_cache.js
// @require ./remove_data_cache.js

function removeData ( ele, key ) {

  if ( key === undefined ) {

    removeDataCache ( ele );

  } else {

    const cache = getDataCache ( ele );

    delete cache[key];

  }

}
