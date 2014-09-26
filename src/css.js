
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
      computed = window.getComputedStyle(this[0],null);
      return computed[prop];
    }
  }
};