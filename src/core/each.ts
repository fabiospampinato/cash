
// @require ./cash.ts

function each ( arr: ArrayLike<any>, callback: Function ): void {

  for ( let i = 0, l = arr.length; i < l; i++ ) {

    if ( callback.call ( arr[i], i, arr[i] ) === false ) break;

  }

}

interface CashStatic {
  each ( arr: ArrayLike<any>, callback: Function ): void;
}

cash.each = each;
