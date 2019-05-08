
// @require core/camel_case.ts

function setData ( ele: HTMLElement, key: string, value ): void {

  try {
    value = JSON.stringify ( value );
  } catch {}

  if ( ele.dataset ) {

    ele.dataset[camelCase ( key )] = value;

  } else {

    ele.setAttribute ( `data-${key}`, value );

  }

}
