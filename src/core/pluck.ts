
// @require ./variables.ts

function pluck<T> ( arr: ArrayLike<T>, prop: string, deep?: boolean ): Array<T> {

  const plucked: Array<T> = [];

  for ( let i = 0, l = arr.length; i < l; i++ ) {

    let val = arr[i][prop];

    while ( val != null ) {

      plucked.push ( val );

      if ( !deep ) break;

      val = val[prop];

    }

  }

  return plucked;

}
