
// @require core/attempt.ts
// @require core/camel_case.ts

const JSONStringRe = /^\s+|\s+$/;

function getData ( ele: EleLoose, key: string ): any {

  const value = ele.dataset[key] || ele.dataset[camelCase ( key )];

  if ( JSONStringRe.test ( value ) ) return value;

  return attempt ( JSON.parse, value );

}
