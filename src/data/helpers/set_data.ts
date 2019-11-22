
// @require core/camel_case.ts

function setData ( ele: Ele, key: string, value: any ): void {

  // cash actual Obj like jquery instead of storing a string version
  if (typeof value === 'object' && (value !== null || ele[key] !== undefined)) {
    if (value === null) {
      delete ele[key];
    } else {
      ele[key] = value;
    }
    return;
  }

  try {
    value = JSON.stringify ( value );
  } catch {}

  if ( ele.dataset ) {

    ele.dataset[camelCase ( key )] = value;

  } else {

    ele.setAttribute ( `data-${key}`, value );

  }

}
