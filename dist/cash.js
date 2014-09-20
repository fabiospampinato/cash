(function(){
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

$.ajax = function(options){
  var request = new XMLHttpRequest();
  request.open(options.type, options.url, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      if(options.success){
        options.success.call(request.responseText);
      }
    } else {
      if(options.error) {
        options.error.call();
      }
    }
  };
  request.onerror = function() {
    if(options.error) {
      options.error.call();
    }
  };
  if(options.type === "POST"){
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    request.send(options.data || "");
  } else {
    request.send();
  }
};


_.addClass = function(className){
  this.each(function(v){
    if(!v.classList.contains(className)) {
      v.classList.add(className);
    }
  });
  return this;
};

_.attr = function(attr,value) {
  if(!value){
    return this[0].getAttribute(attr);
  } else {
    this.each(function(v){
      v.setAttribute(attr,value);
    });
    return this;
  }
};

_.hasClass = function(className){
  return this[0].classList.contains(className);
};

_.prop = function(prop){
  return this[0][prop];
}; 

_.removeAttr = function(attr){
  this.each(function(v){
    v.removeAttribute(attr);
  });
  return this;
};

_.removeClass = function(className){
  this.each(function(v){
    if(v.classList.contains(className)) {
      v.classList.remove(className);
    }
  });
  return this;
};

_.each = Array.prototype.forEach;

_.eq = function(index){
  return $(this[index]);
};

_.filter = function(){
  if(typeof arguments[0] === "string") {
    var selector = arguments[0];
    return Array.prototype.filter.call(this, function(e){
      return $.matches(e, selector);
    });
  } else {
    return Array.prototype.filter.call(this, arguments[0]);
  }
};

_.first = function(){
  return this[0];
};

_.get = function( num ) {
  return num != null ?
    ( num < 0 ? this[ num + this.length ] : this[ num ] ) :
    slice.call( this );
};

_.index = function(elem){
  if(!elem) {
    return Array.prototype.slice.call($(this[0]).parent().children()).indexOf(this[0]);
  } else {
    return Array.prototype.slice.call($(elem).children()).indexOf(this[0]);
  }
};

_.last = function(){
  return this[this.length -1];
};

_.css = function(){
  var computed, prop, value, collection;
  if(typeof arguments[0] === "object") {
    collection = arguments[0];
    this.each(function(v){
      for (var key in collection) {
        if (collection.hasOwnProperty(key)) {
          v.style[key] = collection[key];
        }
      }
    });
  } else {
    prop = arguments[0];
    value = arguments[1];
    if(arguments.length > 1) {
      this.each(function(v){
        v.style[prop] = value;
      });
      return this;
    } else {
      computed = this[0].ownerDocument.defaultView.getComputedStyle(this[0],null);
      return computed[prop];
    }
  }
};

_.data = function(key,value){
  if(!value){
    return this[0].dataset[key];
  } else {
    this.each(function(v){
      v.dataset[key] = value;
    });
    return this;
  }
};

 _.removeData = function(name){
  this.each(function(v){
    if(v.dataset[name]) {
      delete v.dataset[name];
    }
  });
  return this;
};


_.off = function(){
  this.each(function(v){
    var eventName = arguments[0], callback = arguments[1];
    v.removeEventListener(eventName, callback);
  });
};

_.on = function(){
  var eventName, delegate, callback;
  if(typeof arguments[1] === "function") {
    eventName = arguments[0];
    callback = arguments[1];
    this.each(function(v){
      v.addEventListener(eventName, callback);
    });
  } else {
    eventName = arguments[0];
    delegate = arguments[1];
    callback = arguments[2];
    this.each(function(v){
      v.addEventListener(eventName, function(){
        if($.matches(event.target,delegate)){
          callback.call();
        }
      });
    });
  }
};

_.ready = function(callback){
  this[0].addEventListener("DOMContentLoaded", callback);
};

_.serialize = function(){
    var form = this[0];
    var field, query="";
    for(var i=form.elements.length-1; i>=0; i--){
        field = form.elements[i];
        if(field.name && field.type !== "file" && field.type !== "reset"){
            if(field.type === "select-multiple"){
                for(var j=form.elements[i].options.length-1; j>=0; j--){
                    if(field.options[j].selected){
                        query += "&" + field.name + "=" + encodeURIComponent(field.options[j].value).replace(/%20/g,"+");
                    }
                }
            }
            else{
                if((field.type !== "submit" && field.type !== "button")){
                    query += "&" + field.name + "=" + encodeURIComponent(field.value).replace(/%20/g,"+");
                }
            }
        }
    }
    return query.substr(1);
};

_.val = function(value){
    if(!value) {
      return this[0].value;
    } else {
      this.each(function(v){
        v.value = value;
      });
    }
};

_.append = function(content) {
  return this[0].appendChild($(content)[0]);
};


_.appendTo = function(content) {
  return $(content)[0].appendChild(this[0]);
};

_.clone = function() {
  return $(this[0].cloneNode(true));
};

_.empty = function(){
  this.each(function(v){
    v.innerHTML = "";
  });
  return this;
};

_.html = function(content){
  if(!content) {
    return this[0].innerHTML;
  } else {
    this.each(function(v){
      v.innerHTML = $(content)[0].outerHTML;
    });
    return this;
  }
};

_.insertAfter = function(selector){
  return $(selector)[0].insertAdjacentHTML("afterend",this[0].outerHTML);
};

_.insertBefore = function(selector){
  return $(selector)[0].insertAdjacentHTML("beforebegin",this[0].outerHTML);
};

_.prepend = function(selector){
  return $(this)[0].insertAdjacentHTML("afterBegin",$(selector)[0].outerHTML);
};

_.prependTo = function(selector){
  return $(selector)[0].insertAdjacentHTML("afterBegin",this[0].outerHTML);
};

_.remove = function(){
  this.each(function(v){
    v.parentNode.removeChild(v);
  });
};

_.text = function(content){
  if(!content) {
    return this[0].innerText;
  } else {
    this.each(function(v){
      v.innerText = content;
    });
  }
};




_.children = function(selector) {
  if(!selector){
    var children = this[0].children;
    $.extend(children, _);
    return children;
  } else {
    return $.sibling($(selector).firstChild);
  }
};

_.find = function(selector){
  var result;
  result = this[0].querySelectorAll(selector);
  $.extend(result, _);
  return result;
};

_.has = function(selector){
  return Array.prototype.filter.call(this, function(el){
    return $(el).find(selector).length !== 0;
  });
};

_.next = function(){
  return $(this[0].nextElementSibling);
};

_.not = function(selector) {
  return Array.prototype.filter.call(this, function(el){
    return $(el).parent().find(selector).length === 0;
  });
};

_.parent = function(){
  return $(this[0].parentElement);
};

_.parents = function(selector){
  if(!selector){
    return this.parent();
  } else {
    if($.matches(this.parent()[0],selector)) {
      return this.parent();
    } else {
      return this.parent().parents(selector);
    }
  }
};

_.prev = function(){
  return $(this[0].previousElementSibling);
};

_.siblings = function(){
  return this.parent().children();
};

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
};}.call(typeof window !== "undefined" ? window : this));