
cash.fn.extend({

  children: function(selector) {
    if(!selector){
      var children = this[0].children;
      cash.fn.extend(children, cash.fn);
      return children;
    } else {
      return cash(this[0].children).filter(function(v){
        return cash.matches(v,selector);
      });
    }
  },

  closest: function(selector){
    if(!selector || cash.matches(this[0], selector)) {
      return this;
    } else {
      return this.parent().closest(selector);
    }
  },

  is: function(selector){
    return !!selector ? cash.matches(this[0], selector) : false;
  },

  find: function(selector){
    var result;
    result = this[0].querySelectorAll(selector);
    cash.fn.extend(result, cash.fn);
    return result;
  },

  has: function(selector){
    return Array.prototype.filter.call(this, function(el){
      return cash(el).find(selector).length !== 0;
    });
  },

  next: function(){
    return cash(this[0].nextElementSibling);
  },

  not: function(selector) {
    return Array.prototype.filter.call(this, function(el){
      return !cash.matches(el, selector);
    });
  },

  parent: function(){
    return cash(this[0].parentElement);
  },

  parents: function(selector){
    var last = this[0], result = [], count = 0;
    while(last !== document.body.parentNode) {
        last = last.parentElement;
        if(!selector || (selector && cash.matches(last, selector))) {
          result[count] = last;
          count++;
        }
    }
    return cash.merge(cash(), result);
  },

  prev: function(){
    return cash(this[0].previousElementSibling);
  },

  siblings: function(){
    var collection = this.parent().children(), el = this[0];
    return Array.prototype.filter.call(collection,function(i){
      return i !== el;
    });
  }

});
