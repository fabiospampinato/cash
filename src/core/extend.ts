
// @require ./cash.ts

function extend ( target, ...objs: any[] ) {

  const args = arguments,
        length = args.length;

  for ( let i = ( length < 2 ? 0 : 1 ); i < length; i++ ) {
    for ( const key in args[i] ) {
      target[key] = args[i][key];
    }
  }

  return target;

}

interface Cash {
  extend ( plugins: plainObject ): this;
}

Cash.prototype.extend = function ( plugins: plainObject ) {
  return extend ( cash.fn, plugins );
};

interface CashStatic {
  extend ( target, ...objs: any[] );
}

cash.extend = extend;
