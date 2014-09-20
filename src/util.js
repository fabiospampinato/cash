
$.each = function(list,callback){
  list.forEach(callback);
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

$.noop = function(){};

$.parseHTML = function(str) {
  var tmp = document.createElement("div");
  tmp.innerHTML = str;
  return tmp.firstChild;
};