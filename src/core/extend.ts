
// @require ./cash.ts
// @require ./type_checking.ts

interface CashStatic {
  extend (): any;
  extend ( deep: true, target: any, ...sources: any[] ): any;
  extend ( target: any ): typeof cash;
  extend ( target: any, ...sources: any[] ): any;
}

interface Cash {
  extend ( plugins: Record<any, any> ): this;
}

function extend ( ...sources: any[] ) {

  const deep = isBoolean ( sources[0] ) ? sources.shift () : false;
  const target = sources.shift ();
  const length = sources.length;

  if ( !target ) return {};

  if ( !length ) return extend ( deep, cash, target );

  for ( let i = 0; i < length; i++ ) {

    const source = sources[i];

    for ( const key in source ) {

      if ( deep && ( isArray ( source[key] ) || isPlainObject ( source[key] ) ) ) {

        if ( !target[key] || target[key].constructor !== source[key].constructor ) target[key] = new source[key].constructor ();

        extend ( deep, target[key], source[key] );

      } else {

        target[key] = source[key];

      }

    }

  }

  return target;

}

cash.extend = extend;

fn.extend = function ( plugins: Record<string, any> ) {

  return extend ( fn, plugins );

};
