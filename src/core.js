
this.cash = this.$ = function(selector, context){
  var obj = Object.create(cash.fn);
  return obj.init(selector, context);
};

var _ = cash.fn = cash.prototype = {cash: true};

_.init = function(selector, context){
  var result =[];
  if(!selector) {
    return this;
  }
  if(typeof selector === "object") {
    if(selector.cash) {
      return selector;
    } else {
      result.push(selector);
      $.extend(result, $.fn);
      return result;
    }
  }
  if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
    result.push.apply(result, $.parseHTML(selector));
  } else {
    if(!context) {
      result = querySelect(selector);
    } else {
      context = querySelect(context);
      result = querySelect(selector,context[0]);
    }
  }
  $.extend(result, $.fn);
  return result;
};

function querySelect(selector, context) {

  var idMatch,classMatch, root = context || document;
  idMatch = (/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/).exec(selector);
  classMatch = (/^(?:\s*(<[\w\W]+>)[^>]*|\.([\w-]*))$/).exec(selector);
  if(idMatch){
    return [document.getElementById(idMatch[2])];
  } else if (classMatch) {
    return [].slice.call(document.getElementsByClassName(classMatch[2]));
  } else {
    return [].slice.call(root.querySelectorAll(selector));
  }
}