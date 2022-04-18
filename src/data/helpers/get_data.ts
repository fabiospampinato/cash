
// @require core/attempt.ts
// @require core/camel_case.ts

const trailingWhitespace = /^\s+|\s+$/;
const scientificNotation = /e[+-]?\d+$/;

function getData ( ele: EleLoose, key: string ): any {

  const value = ele.dataset[key] || ele.dataset[camelCase ( key )];

  if ( trailingWhitespace.test ( value ) || scientificNotation.test ( value ) ) return value;

  return attempt ( JSON.parse, value );

}
