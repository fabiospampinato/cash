
// @require core/camel_case.ts

function getData ( ele: HTMLElement, key: string ) {

  const value = ele.dataset ? ele.dataset[key] || ele.dataset[camelCase ( key )] : ele.getAttribute ( `data-${key}` );

  try {
    return JSON.parse ( value );
  } catch {}

  return value;

}
