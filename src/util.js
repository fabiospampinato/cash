
$.each = function(collection,callback){
  for(var i = 0; i < collection.length; i++){
    callback.call(collection[i],collection[i],i,collection);
  }
};

$.extend = function(obj) {
    if (typeof obj !== "object") { return obj; }
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
};

$.matches = function(el, selector) {
  return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
};

$.merge = function( first, second ) {
  var len = +second.length,
    j = 0,
    i = first.length;
  for ( ; j < len; j++ ) {
    first[ i++ ] = second[ j ];
  }
  first.length = i;
  return first;
};

$.noop = function(){};

$.parseHTML = function(str) {
  var parsed = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/).exec(str);
  if(parsed) {
    return [document.createElement(parsed[1])];
  }
  parsed = buildFragment(str);
  return [].slice.call(parsed.childNodes);
};

function buildFragment(str){
  var fragment, tmp;
  fragment = fragment || document.createDocumentFragment();
  tmp = tmp || fragment.appendChild(document.createElement("div"));
  tmp.innerHTML = str;
  return tmp;
}
