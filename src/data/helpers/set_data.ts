
// @require core/camel_case.ts

function setData ( ele: Ele, key: string, value: any ): void {

  if ( ele.dataset ) {

    ele.dataset[camelCase ( key )] = value;

  } else {

    try {
      value = JSON.stringify ( value );
    } catch {}

    ele.setAttribute ( `data-${key}`, value );

  }

}
