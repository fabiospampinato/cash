

this.cash = this.$ = function(selector, context){
  return new cash.prototype.init(selector, context);
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
      this.length = 0;
      result.push(selector);
      $.merge(this, result);
      return this;
    }
  }
  if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
    result = $.parseHTML(selector);
  } else {
    if(!context) {
      result = querySelect(selector);
    } else {
      context = querySelect(context);
      result = querySelect(selector,context[0]);
    }
  }
  this.length = 0;
  $.merge(this,result);
  return this;
};

_.init.prototype = _;

function querySelect(selector, context) {

  var idMatch,classMatch, root = context || document;
  idMatch = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
  classMatch = /^(?:\s*(<[\w\W]+>)[^>]*|\.([\w-]*))$/;
  if(idMatch.test(selector)){
    return [document.getElementById(selector.slice(1))];
  } else if (classMatch.test(selector)) {
    return [].slice.call(document.getElementsByClassName(selector.slice(1)));
  } else {
    return [].slice.call(root.querySelectorAll(selector));
  }
}