
// @require attributes/attr.ts
// @require ./get_data_cache.ts

function getData ( ele: HTMLElement, key?: string ): plainObject {

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
