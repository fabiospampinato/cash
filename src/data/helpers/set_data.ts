
// @require ./get_data_cache.ts

function setData ( ele, key, value ) {
  getDataCache ( ele )[key] = value;
}
