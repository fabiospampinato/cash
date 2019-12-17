
// @require core/camel_case.ts

function setData ( ele: EleLoose, key: string, value: any ): void {

  try {

    value = JSON.stringify ( value );

  } catch {}

  ele.dataset[camelCase ( key )] = value;

}
