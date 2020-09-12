
// @require ./cash.ts
// @require ./variables.ts

interface CashStatic {
  isWindow ( x: any ): x is Window;
  isFunction ( x: any ): x is Function;
  isArray ( x: any ): x is Array<any>;
  isNumeric ( x: any ): boolean;
  isPlainObject ( x: any ): x is PlainObject;
}

function isCash ( x: any ): x is Cash {

  return x instanceof Cash;

}

function isWindow ( x: any ): x is Window {

  return !!x && x === x.window;

}

function isDocument ( x: any ): x is Document {

  return !!x && x.nodeType === 9;

}

function isElement ( x: any ): x is HTMLElement {

  return !!x && x.nodeType === 1;

}

function isFunction ( x: any ): x is Function {

  return typeof x === 'function';

}

function isString ( x: any ): x is string {

  return typeof x === 'string';

}

function isUndefined ( x: any ): x is undefined {

  return x === undefined;

}

function isNull ( x: any ): x is null {

  return x === null;

}

function isNumeric ( x: any ): boolean {

  return !isNaN ( parseFloat ( x ) ) && isFinite ( x );

}

function isPlainObject ( x: any ): x is PlainObject {

  if ( typeof x !== 'object' || x === null ) return false;

  const proto = Object.getPrototypeOf ( x );

  return proto === null || proto === Object.prototype;

}

cash.isWindow = isWindow;
cash.isFunction = isFunction;
cash.isArray = isArray;
cash.isNumeric = isNumeric;
cash.isPlainObject = isPlainObject;
