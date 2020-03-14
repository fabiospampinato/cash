
// @require ./cash.ts

interface CashStatic {
  extend (): any;
  extend ( target: any ): typeof cash;
  extend ( target: any, ...objs: any[] ): any;
}

interface Cash {
  extend ( plugins: Record<any, any> ): this;
}

function extend ( target?: any, ...objs: any[] ) {

  const length = arguments.length;

  if ( !length ) return {};

  if ( length === 1 ) return extend ( cash, target );

  for ( let i = 1; i < length; i++ ) {

    for ( const key in arguments[i] ) {

      if ( arguments[i].hasOwnProperty( key ) ) {

        target[key] = arguments[i][key];

      }

    }

  }

  return target;

}

cash.extend = extend;

fn.extend = function ( plugins: Record<string, any> ) {

  return extend ( fn, plugins );

};
