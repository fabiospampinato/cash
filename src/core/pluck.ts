
// @require ./type_checking.ts
// @require ./variables.ts

type PluckCallback<T> = ( ele: T ) => ArrayLike<T>;

function pluck<T> ( arr: ArrayLike<T>, prop: PluckCallback<T> ): Array<T>;
function pluck<T> ( arr: ArrayLike<T>, prop: string, deep?: boolean ): Array<T>;
function pluck<T> ( arr: ArrayLike<T>, prop: string | PluckCallback<T>, deep?: boolean ): Array<T> {

  const plucked: Array<T> = [],
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
