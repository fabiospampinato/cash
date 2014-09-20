
this.cash = this.$ = function(selector, context){
  var obj = Object.create(cash.fn);
  return obj.init(selector, context);
};

_ = cash.fn = cash.prototype = {cash: true};

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
    result.push($.parseHTML(selector));
  } else {
    if(!context) {
      result = document.querySelectorAll(selector);
    } else {
      if (context = document.querySelectorAll(context)){
        result = context[0].querySelectorAll(selector);
      }
    }
  }
  $.extend(result, $.fn);
  return result;
};