
// @require core/camel_case.ts

function getData ( ele: Ele, key: string ): any {

  const value = ele.dataset[key] || ele.dataset[camelCase ( key )];

  try {

    return JSON.parse ( value );

  } catch {}

  return value;

}
