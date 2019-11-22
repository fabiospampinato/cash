
// @require core/camel_case.ts

function getData ( ele: Ele, key: string ): any {

  const value = ele.dataset ? ele.dataset[key] || ele.dataset[camelCase ( key )] : ele.getAttribute ( `data-${key}` );

  try {
    return ele.dataset ? value : JSON.parse ( value );
  } catch {}

  return value;

}
