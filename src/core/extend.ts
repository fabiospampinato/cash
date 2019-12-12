
// @require ./cash.ts

interface CashStatic {
  extend ( target: any, ...objs: any[] ): any;
}

interface Cash {
  extend ( plugins: plainObject ): this;
}

cash.extend = function ( target: any, ...objs: any[] ) {

  const length = arguments.length;

  for ( let i = ( length < 2 ? 0 : 1 ); i < length; i++ ) {

    for ( const key in arguments[i] ) {

      target[key] = arguments[i][key];

    }

  }

  return target;

};

fn.extend = function ( plugins: plainObject ) {

  return cash.extend ( fn, plugins );

};
