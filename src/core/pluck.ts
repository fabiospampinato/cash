
// @require ./type_checking.ts
// @require ./variables.ts

type PluckCallback<T> = ( ele: T ) => ArrayLike<Ele>;

function pluck<T, U extends ArrayLike<T> = ArrayLike<T>> ( arr: U, prop: PluckCallback<U[0]> ): Array<Ele>;
function pluck<T, U extends ArrayLike<T> = ArrayLike<T>> ( arr: U, prop: string, deep?: boolean ): Array<Ele>;
function pluck<T, U extends ArrayLike<T> = ArrayLike<T>> ( arr: U, prop: string | PluckCallback<U[0]>, deep?: boolean ): Array<Ele> {

  const plucked: Array<Ele> = [],
        isCallback = isFunction ( prop );

  for ( let i = 0, l = arr.length; i < l; i++ ) {

    if ( isCallback ) {

      const val = prop ( arr[i] );

      if ( val.length ) push.apply ( plucked, val );

    } else {

      let val = arr[i][prop];

      while ( val != null ) {

        plucked.push ( val );

        val = deep ? val[prop] : null;

      }

    }

  }

  return plucked;

}
