
// @require ./get_data_cache.js

function setData ( ele, key, value ) {
  return getDataCache ( ele )[key] = value;
}
