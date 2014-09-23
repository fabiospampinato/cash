
_.off = function(){
  var eventName = arguments[0], callback = arguments[1];
  this.each(function(v){
    v.removeEventListener(eventName, callback);
  });
  return this;
};

_.on = function(){
  var eventName, delegate, callback;
  if(typeof arguments[1] === "function") {
    eventName = arguments[0];
    callback = arguments[1];
    this.each(function(v){
      v.addEventListener(eventName, callback);
    });
    return this;
  } else {
    eventName = arguments[0];
    delegate = arguments[1];
    callback = arguments[2];
    this.each(function(v){
      v.addEventListener(eventName, function(){
        if($.matches(event.target,delegate)){
          callback.call(event.target);
        }
      });
    });
    return this;
  }
};

_.ready = function(callback){
  this[0].addEventListener("DOMContentLoaded", callback);
};

_.trigger = function(eventName){
  event = document.createEvent("HTMLEvents");
  event.initEvent(eventName, true, false);
  this.each(function(v){
    v.dispatchEvent(event);
  });
  return this;
};