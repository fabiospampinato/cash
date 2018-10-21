
// @require ./cash.ts

function extend ( target = this ) {

  let args = arguments,
      length = args.length;

  for ( let i = ( length < 2 ? 0 : 1 ); i < length; i++ ) {
    for ( let key in args[i] ) {
      target[key] = args[i][key];
    }
  }

  return target;

}

interface Cash {
  extend ( target, ...objs: any[] ): this;
}

interface CashStatic {
  extend ( target, ...objs: any[] );
}

Cash.prototype.extend = cash.extend = extend;
