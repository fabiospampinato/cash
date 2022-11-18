
// @require ./get_compare_function.ts
// @require ./type_checking.ts
// @require ./variables.ts

type PluckCallback<T> = ( ele: T ) => ArrayLike<Ele>;

function pluck<T, U extends ArrayLike<T> = ArrayLike<T>> ( arr: U, prop: string | PluckCallback<U[0]>, deep?: boolean, until?: Comparator ): Array<Ele> {

  const plucked: Array<Ele> = [];
  const isCallback = isFunction ( prop );
  const compare = until && getCompareFunction ( until );

  for ( let i = 0, l = arr.length; i < l; i++ ) {

    if ( isCallback ) {

      const val = prop ( arr[i] );

      if ( val.length ) push.apply ( plucked, val );

    } else {

      let val = arr[i][prop];

      while ( val != null ) {

        if ( until && compare ( -1, val ) ) break;

        plucked.push ( val );

        val = deep ? val[prop] : null;

      }

    }

  }

  return plucked;

}
