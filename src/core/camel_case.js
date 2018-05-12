
// @require ./cash.js

const camelCaseRe = /(?:^\w|[A-Z]|\b\w)/g,
      camelCaseWhitespaceRe = /[\s-_]+/g;

function camelCase ( str ) {
  return str.replace ( camelCaseRe, function ( letter, index ) {
    return letter[ !index ? 'toLowerCase' : 'toUpperCase' ]();
  }).replace ( camelCaseWhitespaceRe, '' );
};

cash.camelCase = camelCase;
