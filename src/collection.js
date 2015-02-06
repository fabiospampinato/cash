fn.extend({

  add() {
    var arr = slice.call(this),
        i = 0, l;

    for (l = arguments.length; i < l; i++) {
      arr = arr.concat(slice.call(cash(arguments[i])));
    }

    return cash.unique(arr);
  },

  each(callback) {
    cash.each(this, callback);
  },

  eq(index) {
    return cash(this[index]);
  },

  filter(selector) {
    if (typeof selector === 'string') {
      return filter.call(this, e => cash.matches(e, selector));
    } else {
      return filter.call(this, selector);
    }
  },

  first() {
    return cash(this[0]);
  },

  get(num) {
    return this[num];
  },

  index(elem) {
    if (!elem) {
      return slice.call(cash(this[0]).parent().children()).indexOf(this[0]);
    } else {
      return slice.call(cash(elem).children()).indexOf(this[0]);
    }
  },

  last() {
    return cash(this[this.length - 1]);
  }

});
