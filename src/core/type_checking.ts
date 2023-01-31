
// @require ./cash.ts
// @require ./variables.ts

interface CashStatic {
  isWindow ( x: unknown ): x is Window;
  isFunction ( x: unknown ): x is Function;
  isArray ( x: unknown ): x is Array<any>;
  isNumeric ( x: unknown ): boolean;
  isPlainObject ( x: unknown ): x is PlainObject<any>;
}

function isCash ( value: unknown ): value is Cash {

  return value instanceof Cash;

}

function isWindow ( value: unknown ): value is Window {

  return !!value && value === value.window;

}

function isDocument ( value: unknown ): value is Document {

  return !!value && value.nodeType === 9;

}

function isDocumentFragment ( value: unknown ): value is DocumentFragment {

  return !!value && value.nodeType === 11;

}

function isElement ( value: unknown ): value is HTMLElement {

  return !!value && value.nodeType === 1;

}

function isText ( value: unknown ): value is Text {

  return !!value && value.nodeType === 3;

}

function isBoolean ( value: unknown ): value is boolean {

  return typeof value === 'boolean';

}

function isFunction ( value: unknown ): value is Function {

  return typeof value === 'function';

}

function isString ( value: unknown ): value is string {

  return typeof value === 'string';

}

function isUndefined ( value: unknown ): value is undefined {

  return value === undefined;

}

function isNull ( value: unknown ): value is null {

  return value === null;

}

function isNumeric ( value: unknown ): boolean {

  return !isNaN ( parseFloat ( value ) ) && isFinite ( value );

}

function isPlainObject ( value: unknown ): value is PlainObject<any> {

  if ( typeof value !== 'object' || value === null ) return false;

  const proto = Object.getPrototypeOf ( value );

  return proto === null || proto === Object.prototype;

}

cash.isWindow = isWindow;
cash.isFunction = isFunction;
cash.isArray = isArray;
cash.isNumeric = isNumeric;
cash.isPlainObject = isPlainObject;
