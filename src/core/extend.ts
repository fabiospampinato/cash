
// @require ./cash.ts

interface CashStatic {
  extend (): any;
  extend ( target: any ): typeof cash;
  extend ( target: any, ...objs: any[] ): any;
  extend ( deep: boolean, target: any, ...objs: any[] ): any;
}

interface Cash {
  extend ( plugins: Record<any, any> ): this;
}

function extend ( ...objs: any[] ) {

  const length = objs.length;

  if ( !length ) return {};

  if ( length === 1 ) return extend ( cash, objs[0] );

  let deep = typeof objs[0] === 'boolean'
    ? objs.shift()
    : false;

  let target = objs.shift();

  for ( let i = 0; i < objs.length; i++ ) {

    for ( const key in objs[i] ) {

      if (deep && (Array.isArray(objs[i][key]) || isPlainObject(objs[i][key]))) {

        if (Array.isArray(objs[i][key]) && !Array.isArray(target[key])) {

          target[key] = [];

        } else if (isPlainObject(objs[i][key]) && !isPlainObject(target[key])) {

          target[key] = {};

        }

        extend(deep, target[key], objs[i][key]);

      }
      else {

        target[key] = objs[i][key];

      }

    }

  }

  return target;

}

cash.extend = extend;

fn.extend = function ( plugins: Record<string, any> ) {

  return extend ( fn, plugins );

};
