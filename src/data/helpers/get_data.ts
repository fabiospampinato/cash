
// @require core/camel_case.ts

const JSONStringRe = /^\s+|\s+$/;

function getData ( ele: EleLoose, key: string ): any {

  const value = ele.dataset[key] || ele.dataset[camelCase ( key )];

  if ( !JSONStringRe.test ( value ) ) {

    try {

      return JSON.parse ( value );

    } catch {}

  }

  return value;

}
