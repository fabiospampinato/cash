
// @require ./cash.ts

const dashAlphaRe = /-([a-z])/g;

function camelCase ( str: string ): string {

  return str.replace ( dashAlphaRe, ( match: string, letter: string ) => letter.toUpperCase () );

}
