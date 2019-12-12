
// @require core/camel_case.ts

function setData ( ele: Ele, key: string, value: any ): void {

  try {

    value = JSON.stringify ( value );

  } catch {}

  if ( ele.dataset ) {

    ele.dataset[camelCase ( key )] = value;

  } else {

    ele.setAttribute ( `data-${key}`, value );

  }

}
