
// @require ./cash.ts
// @require ./type_checking.ts

type EachArrayCallback<T> = ( this: T, index: number, ele: T ) => any;
type EachObjectCallback<T> = ( this: T, key: string, value: T ) => any;

interface CashStatic {
  each<T> ( arr: ArrayLike<T>, callback: EachArrayCallback<T> ): void;
  each<T> ( obj: PlainObject<T>, callback: EachObjectCallback<T> ): void;
}

function each<T, U extends ArrayLike<T> = ArrayLike<T>> ( arr: U, callback: EachArrayCallback<T>, _reverse?: boolean ): U;
function each<T, U extends PlainObject<T> = PlainObject<T>> ( obj: U, callback: EachObjectCallback<T> ): U;
function each<T, U extends ArrayLike<T> | PlainObject<T> = ArrayLike<T>> ( arr: U, callback: EachArrayCallback<T> | EachObjectCallback<T>, _reverse?: boolean ): U {

  if ( _reverse ) {

    let i = arr.length;

    while ( i-- ) {

      if ( callback.call ( arr[i], i, arr[i] ) === false ) return arr;

    }

  } else if ( isPlainObject ( arr ) ) {

    const keys = Object.keys ( arr );

    for ( let i = 0, l = keys.length; i < l; i++ ) {

      const key = keys[i];

      if ( callback.call ( arr[key], key, arr[key] ) === false ) return arr;

    }

  } else {

    for ( let i = 0, l = arr.length; i < l; i++ ) {

      if ( callback.call ( arr[i], i, arr[i] ) === false ) return arr;

    }

  }

  return arr;

}

cash.each = each;
