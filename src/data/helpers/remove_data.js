
// @require ./variables.js
// @require ./get_data_cache.js

function removeData ( ele, key ) {

  if ( key === undefined ) {

    delete ele[dataNamespace];

  } else {

    delete getDataCache ( ele )[key];

  }

}
