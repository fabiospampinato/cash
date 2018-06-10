
// @require attributes/attr.js
// @require ./get_data_cache.js

function getData ( ele, key ) {

  const cache = getDataCache ( ele );

  if ( key ) {

    if ( !( key in cache ) ) {

      let value = ele.dataset ? ele.dataset[key] || ele.dataset[camelCase ( key )] : cash ( ele ).attr ( `data-${key}` );

      if ( value !== undefined ) {

        try {
          value = JSON.parse ( value );
        } catch ( e ) {}

        cache[key] = value;

      }

    }

    return cache[key];

  }

  return cache;

}
