
// @require ./variables.js

function Cash ( selector, context ) {

  if ( !selector ) return this;

  if ( selector.cash && selector !== win ) return selector;

  let eles = selector;

  if ( isString ( selector ) ) {

    eles = idRe.test ( selector )
              ? doc.getElementById ( selector.slice ( 1 ) )
              : htmlRe.test ( selector )
                ? parseHTML ( selector )
                : find ( selector, context );

  } else if ( isFunction ( selector ) ) {

    return this.ready ( selector ); //FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality

  }

  if ( !eles ) return this;

  if ( eles.nodeType || eles === win ) {

    this[0] = eles;
    this.length = 1;

  } else {

    this.length = eles.length;

    for ( let i = 0, l = this.length; i < l; i++ ) {
      this[i] = eles[i];
    }

  }

  return this;

}

win.cash = win.$ = function cash ( selector, context ) {
  return new Cash ( selector, context );
}

/* PROTOTYPE */

const fn = cash.fn = cash.prototype = Cash.prototype = {
  init: Cash,
  cash: true,
  length: 0
};

Object.defineProperty ( fn, 'constructor', { value: cash } );
