
// @require ./cash.ts

const camelCaseRe = /(?:^\w|[A-Z]|\b\w)/g,
      camelCaseWhitespaceRe = /[\s-_]+/g;

function camelCase ( str: string ): string {
  return str.replace ( camelCaseRe, function ( letter, index ) {
    return letter[ !index ? 'toLowerCase' : 'toUpperCase' ]();
  }).replace ( camelCaseWhitespaceRe, '' );
};

interface CashStatic {
  camelCase ( str: string ): string;
}

cash.camelCase = camelCase;
