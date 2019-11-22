
// @require core/camel_case.ts

function getData ( ele: Ele, key: string ): any {

  // see if we have a cache (used for Obj) first
  if (ele[key] !== undefined) {
    return ele[key];
  }

  const value = ele.dataset ? ele.dataset[key] || ele.dataset[camelCase ( key )] : ele.getAttribute ( `data-${key}` );

  try {
    return JSON.parse ( value );
  } catch {}

  return value;

}
