
// @require ./find.ts
// @require ./variables.ts

class Cash {

  constructor ( selector?: Selector, context?: Context | Cash ) {

    if ( !selector ) return;

    if ( isCash ( selector ) ) return selector;

    let eles: any = selector;

    if ( isString ( selector ) ) {

      const ctx = context || doc;

      eles = idRe.test ( selector ) && isDocument ( ctx )
                ? ctx.getElementById ( selector.slice ( 1 ).replace ( /\\/g, '' ) )
                : htmlRe.test ( selector )
                  ? parseHTML ( selector )
                  : isCash ( ctx )
                    ? ctx.find ( selector )
                      : isString ( ctx )
                        ? cash ( ctx ).find ( selector )
                        : find ( selector, ctx );

      if ( !eles ) return;

    } else if ( isFunction ( selector ) ) {

      return this.ready ( selector ); //FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality

    }

    if ( eles.nodeType || eles === win ) eles = [eles];

    this.length = eles.length;

    for ( let i = 0, l = this.length; i < l; i++ ) {

      this[i] = eles[i];

    }

  }

  init ( selector?: Selector, context?: Context | Cash ) {

    return new Cash ( selector, context );

  }

}

const fn = Cash.prototype;
const cash = fn.init as ( typeof Cash.prototype.init & CashStatic );

cash.fn = cash.prototype = fn; // Ensuring that `cash () instanceof cash`

fn.length = 0;
fn.splice = splice; // Ensuring a cash collection gets printed as array-like in Chrome's devtools

if ( typeof Symbol === 'function' ) { // Ensuring a cash collection is iterable
  fn[Symbol['iterator']] = ArrayPrototype[Symbol['iterator']];
}
