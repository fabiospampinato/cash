
// @require ./cash.ts

const dashAlphaRe = /-([a-z])/g;

function camelCaseReplace ( match: string, letter: string ): string {
  return letter.toUpperCase ();
}

function camelCase ( str: string ): string {
  return str.replace ( dashAlphaRe, camelCaseReplace );
}

interface CashStatic {
  camelCase ( str: string ): string;
}

cash.camelCase = camelCase;
