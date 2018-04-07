
// @require ./cash.js

function isFunction ( x ) {
  return typeof x === 'function';
}

cash.isFunction = isFunction;

function isString ( x ) {
  return typeof x === 'string';
}

cash.isString = isString;

function isNumeric ( x ) {
  return !isNaN ( parseFloat ( x ) ) && isFinite ( x );
}

cash.isNumeric = isNumeric;

const isArray = Array.isArray;

cash.isArray = isArray;
