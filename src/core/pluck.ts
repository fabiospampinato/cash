
// @require ./variables.ts

function pluck ( arr: ArrayLike<any>, prop: string, deep?: boolean ): ArrayLike<any> {

  const plucked = [];

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
