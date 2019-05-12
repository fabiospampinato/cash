
// @require ./cash.ts

function isCash ( x: any ): x is Cash {
  return x instanceof Cash;
}

function isDocument ( x: any ): x is Document {
  return x.nodeType === 9;
}

function isElement ( x: any ): x is HTMLElement {
  return x.nodeType === 1;
}

function isFunction ( x: any ): x is Function {
  return typeof x === 'function';
}

function isString ( x: any ): x is string {
  return typeof x === 'string';
}

function isNumeric ( x: any ): boolean {
  return !isNaN ( parseFloat ( x ) ) && isFinite ( x );
}

const {isArray} = Array;

interface CashStatic {
  isFunction ( x: any ): x is Function;
  isString ( x: any ): x is string;
  isNumeric ( x: any ): boolean;
  isArray ( x: any ): x is Array<any>;
}

cash.isFunction = isFunction;
cash.isString = isString;
cash.isNumeric = isNumeric;
cash.isArray = isArray;
