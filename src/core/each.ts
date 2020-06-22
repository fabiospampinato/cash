
// @require ./cash.ts

type EachCallback<T> = ( this: T, index: number, ele: T ) => any;

interface CashStatic {
  each<T> ( arr: ArrayLike<T>, callback: EachCallback<T> ): void;
}

function each<T, U extends ArrayLike<T> = ArrayLike<T>> ( arr: U, callback: EachCallback<U[0]>, _reverse?: boolean ): U {

  if ( _reverse ) {

    let i = arr.length;

    while ( i-- ) {

      if ( callback.call ( arr[i], i, arr[i] ) === false ) return arr;

    }

  } else if ( isPlainObject( arr ) ) {

    let keys = Object.keys( arr );

    for ( let i = 0, l = keys.length; i < l; i++ ) {

      if ( callback.call ( arr[keys[i]], keys[i], arr[keys[i]] ) === false ) return arr;

    }

  } else {

    for ( let i = 0, l = arr.length; i < l; i++ ) {

      if ( callback.call ( arr[i], i, arr[i] ) === false ) return arr;

    }

  }

  return arr;

}

cash.each = each;
