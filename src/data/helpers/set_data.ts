
// @require ./get_data_cache.ts

function setData ( ele: HTMLElement, key: string, value ): void {
  getDataCache ( ele )[key] = value;
}
