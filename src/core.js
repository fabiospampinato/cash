var noop = function(){},
    isFunction = function(item) {
        // @see https://crbug.com/568448
        return typeof item === typeof noop && item.call;
    },
    isString = function(item) { return typeof item === typeof ''; };

var idMatch    = /^#[\w-]*$/,
    classMatch = /^\.[\w-]*$/,
    htmlMatch =  /<.+>/,
    singlet    = /^\w+$/;

function find(selector,context) {
  context = context || doc;
  var elems = (
        classMatch.test(selector) ?
          context.getElementsByClassName(selector.slice(1)) :
          singlet.test(selector) ?
            context.getElementsByTagName(selector) :
            context.querySelectorAll(selector)
      );
  return elems;
}

var frag;
function parseHTML(str) {
  if (!frag) {
    frag = doc.implementation.createHTMLDocument(null);
    var base = frag.createElement('base');
    base.href = doc.location.href;
    frag.head.appendChild(base);
  }

  frag.body.innerHTML = str;

  return frag.body.childNodes;
}

function onReady(fn) {
  if ( doc.readyState !== 'loading' ) { setTimeout(fn); }
  else { doc.addEventListener('DOMContentLoaded', fn); }
}

function Init(selector,context){

  if ( !selector ) { return this; }

  // If already a cash collection, don't do any further processing
  if ( selector.cash && selector !== win ) { return selector; }

  var elems = selector,
      i = 0,
      length;

  if ( isString(selector) ) {
    elems = (
      idMatch.test(selector) ?
        // If an ID use the faster getElementById check
        doc.getElementById(selector.slice(1)) :
        htmlMatch.test(selector) ?
          // If HTML, parse it into real elements
          parseHTML(selector) :
          // else use `find`
          find(selector,context)
      );

  // If function, use as shortcut for DOM ready
  } else if ( isFunction(selector) ) { onReady(selector); return this; }

  if ( !elems ) { return this; }

  // If a single DOM element is passed in or received via ID, return the single element
  if ( elems.nodeType || elems === win ) {
    this[0] = elems;
    this.length = 1;
  } else {
    // Treat like an array and loop through each item.
    length = this.length = elems.length;
    for( ; i < length; i++ ) { this[i] = elems[i]; }
  }

  return this;
}

function cash(selector,context) {
  return new Init(selector,context);
}

var fn = cash.fn = cash.prototype = Init.prototype = { // jshint ignore:line
  cash: true,
  length: 0,
  push: push,
  splice: ArrayProto.splice,
  map: ArrayProto.map,
  init: Init
};

Object.defineProperty(fn,'constructor',{ value: cash });

cash.parseHTML = parseHTML;
cash.noop = noop;
cash.isFunction = isFunction;
cash.isString = isString;
