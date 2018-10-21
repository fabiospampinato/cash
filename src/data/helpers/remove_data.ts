
// @require ./variables.ts
// @require ./get_data_cache.ts

function removeData ( ele, key ) {

  if ( key === undefined ) {

    delete ele[dataNamespace];

  } else {

    delete getDataCache ( ele )[key];

  }

}
