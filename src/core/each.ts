
// @require ./cash.ts

type EachCallback<T> = ( this: T, index: number, ele: T ) => any;

function each<T> ( arr: ArrayLike<T>, callback: EachCallback<T> ): void {

  for ( let i = 0, l = arr.length; i < l; i++ ) {

    if ( callback.call ( arr[i], i, arr[i] ) === false ) break;

  }

}

interface CashStatic {
  each<T> ( arr: ArrayLike<T>, callback: EachCallback<T> ): void;
}

cash.each = each;
