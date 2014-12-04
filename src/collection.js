fn.extend({

  add: function() {
    var arr = slice.call(this),
        i = 0, l;

    for (l = arguments.length; i < l; i++) {
      arr = arr.concat(slice.call(cash(arguments[i])));
    }

    return cash.unique(arr);
  },

  each: function(callback) {
    cash.each(this, callback);
  },

  eq: function(index) {
    return cash(this[index]);
  },

  filter: function(selector) {
    if (typeof selector === 'string') {
      return filter.call(this, function(e) {
        return cash.matches(e, selector);
      });
    } else {
      return filter.call(this, selector);
    }
  },

  first: function() {
    return cash(this[0]);
  },

  get: function(num) {
    return this[num];
  },

  index: function(elem) {
    if (!elem) {
      return slice.call(cash(this[0]).parent().children()).indexOf(this[0]);
    } else {
      return slice.call(cash(elem).children()).indexOf(this[0]);
    }
  },

  last: function() {
    return cash(this[this.length - 1]);
  }

});
