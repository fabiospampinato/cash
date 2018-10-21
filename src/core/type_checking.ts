
// @require ./cash.ts

function isCash ( x ): x is Cash {
  return x instanceof Cash;
}

function isFunction ( x ): x is Function {
  return typeof x === 'function';
}

function isString ( x ): x is string {
  return typeof x === 'string';
}

function isNumeric ( x ): boolean {
  return !isNaN ( parseFloat ( x ) ) && isFinite ( x );
}

const {isArray} = Array;

interface CashStatic {
  isFunction ( x ): x is Function;
  isString ( x ): x is string;
  isNumeric ( x ): boolean;
  isArray ( x ): x is Array<any>;
}

cash.isFunction = isFunction;
cash.isString = isString;
cash.isNumeric = isNumeric;
cash.isArray = isArray;
