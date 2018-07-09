
// @require ./find.js
// @require ./variables.js

function Cash ( selector, context = doc ) {

  if ( !selector ) return;

  if ( selector.__cash ) return selector;

  let eles = selector;

  if ( isString ( selector ) ) {

    if ( context.__cash ) context = context[0];

    eles = idRe.test ( selector )
              ? context.getElementById ( selector.slice ( 1 ) )
              : htmlRe.test ( selector )
                ? parseHTML ( selector )
                : find ( selector, context );

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

function cash ( selector, context ) {
  return new Cash ( selector, context );
}

/* PROTOTYPE */

const fn = cash.fn = cash.prototype = Cash.prototype = {
  constructor: cash,
  __cash: true,
  length: 0,
  splice // Ensures a cash collection gets printed as array-like in Chrome
};
