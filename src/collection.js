
cash.fn.extend({

  add: function(){
    var arr = [], i = 0;
    arr = [].slice.call(this);
    for(var l=arguments.length; i < l; i++) {
      arr = arr.concat([].slice.call(cash(arguments[i])));
    }
    arr = arr.filter(function(item,index,self){
      return self.indexOf(item) === index;
    });
    return cash.merge(cash(), arr);
  },

  each: function(callback){
    cash.each(this, callback);
  },

  eq: function(index){
    return $(this[index]);
  },

  filter: function(){
    if(typeof arguments[0] === "string") {
      var selector = arguments[0];
      return Array.prototype.filter.call(this, function(e){
        return cash.matches(e, selector);
      });
    } else {
      return Array.prototype.filter.call(this, arguments[0]);
    }
  },

  first: function(){
    return $(this[0]);
  },

  get: function( num ) {
    return this[num];
  },

  index: function(elem){
    if(!elem) {
      return Array.prototype.slice.call(cash(this[0]).parent().children()).indexOf(this[0]);
    } else {
      return Array.prototype.slice.call(cash(elem).children()).indexOf(this[0]);
    }
  },

  last: function(){
    return $(this[this.length -1]);
  }

});