var noop = function(){},
    isFunction = function(type){ return typeof item === typeof noop; },
    isString = function(item) { return typeof item === typeof ''; },
    idOrHTML = /^\s*?(#([-\w]*)|<[\w\W]*>)\s*?$/,
    singletTagOrClass = /^(\.)?([\w-_]*)$/;

function find(selector,context) {
  context = context || doc;
  var match = singletTagOrClass.exec(selector),
      elems = (
        match ?
          match[1] ?
          doc.getElementsByClassName(match[2]) :
          doc.getElementsByTagName(selector) :
        context.querySelectorAll(selector)
      );
  return slice.call(elems);
}

function parseHTML(str) {
  var tmp = doc.implementation.createHTMLDocument();
  tmp.body.innerHTML = str;
  return slice.call(tmp.body.children);
}

function onReady(fn) {
  if ( doc.readyState !== 'loading' ) { fn(); }
  else { doc.addEventListener('DOMContentLoaded', fn); }
}

function Init(selector,context){
  var elems = selector,
      i = 0,
      match, length;

  if ( !selector ) { return this; }

  // If already a cash collection, don't do any further processing
  if ( selector.cash ) { return selector; }
  // If function, use as shortcut for DOM ready
  else if ( isFunction(selector) ) { onReady(selector); return this; }
  else if ( isString(selector) ) {
    match = idOrHTML.exec(selector);
    // If an ID use the faster getElementById check
    if ( match && match[2] ) {
	    selector = doc.getElementById(match[2]);
			if ( !selector ) { return this; }
		}
    // If HTML, parse it into real elements, else use querySelectorAll
    else { elems = ( match ? parseHTML(selector) : find(selector,context) ); }
  }

  // If a DOM element is passed in or received via ID return the single element
  if ( selector.nodeType || selector === window ) {
    this[0] = selector;
    this.length = 1;
  } else {
    length = this.length = elems.length;
    for( ; i < length; i++ ) { this[i] = elems[i]; }
  }

  return this;
}

function cash(selector,context) {
  return new Init(selector,context);
}

var fn = cash.fn = cash.prototype = Init.prototype = {
  cash: true,
  length: 0,
  init: Init
};

cash.parseHTML = parseHTML;
