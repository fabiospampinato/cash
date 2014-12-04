cash.fn.extend({

  add: function(){
    var arr = [], i = 0;
    arr = [].slice.call(this);
    for(var l=arguments.length; i < l; i++) {
      arr = arr.concat([].slice.call(cash(arguments[i])));
    }
    return cash.unique(arr);
  },

  each: function(callback){
    cash.each(this, callback);
  },

  eq: function(index){
    return cash(this[index]);
  },

  filter: function(){
    if(typeof arguments[0] === "string") {
      var selector = arguments[0];
      return ArrayProto.filter.call(this, function(e){
        return cash.matches(e, selector);
      });
    } else {
      return ArrayProto.filter.call(this, arguments[0]);
    }
  },

  first: function(){
    return cash(this[0]);
  },

  get: function( num ) {
    return this[num];
  },

  index: function(elem){
    if(!elem) {
      return ArrayProto.slice.call(cash(this[0]).parent().children()).indexOf(this[0]);
    } else {
      return ArrayProto.slice.call(cash(elem).children()).indexOf(this[0]);
    }
  },

  last: function(){
    return cash(this[this.length -1]);
  }

});
