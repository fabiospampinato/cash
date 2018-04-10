
// @require ./cash.js

const camelRe = /(?:^\w|[A-Z]|\b\w)/g,
      camelWhitespaceRe = /[\s-_]+/g;

function camelCase ( str ) {
  return str.replace ( camelRe, function ( letter, index ) {
    return letter[ !index ? 'toLowerCase' : 'toUpperCase' ]();
  }).replace ( camelWhitespaceRe, '' );
};

cash.camelCase = camelCase;
