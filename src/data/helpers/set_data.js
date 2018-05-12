
// @require ./get_data_cache.js

function setData ( ele, key, value ) {
  getDataCache ( ele )[key] = value;
}
