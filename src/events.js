
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