
// @require ./cash.ts

type EachCallback<T> = ( this: T, index: number, ele: T ) => any;

interface CashStatic {
  each<T> ( arr: ArrayLike<T>, callback: EachCallback<T> ): void;
}

function each<T> ( arr: ArrayLike<T>, callback: EachCallback<T>, reverse?: boolean ): ArrayLike<T> { //TODO: Maybe add a flag for looping in reverse

  if ( reverse ) {

    let i = arr.length;

    while ( i-- ) {

      if ( callback.call ( arr[i], i, arr[i] ) === false ) return arr;

    }

  } else {

    for ( let i = 0, l = arr.length; i < l; i++ ) {

      if ( callback.call ( arr[i], i, arr[i] ) === false ) return arr;

    }

  }

  return arr;

}

cash.each = each;
