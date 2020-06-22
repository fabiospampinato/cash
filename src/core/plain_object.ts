
// @require ./cash.ts

interface CashStatic {
  isPlainObject ( test: any ): any;
}

function isPlainObject(x) {

  return x !== null && typeof x === 'object' && x !== window && Object.getPrototypeOf(x) == Object.prototype;

}

cash.isPlainObject = isPlainObject;
