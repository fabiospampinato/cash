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
    return cash(this.get(index));
  },

  filter(selector) {
    if (typeof selector === 'string') {
      return filter.call(this, e => cash.matches(e, selector));
    } else {
      return filter.call(this, selector);
    }
  },

  first() {
    return this.eq(0);
  },

	get(index) {
    if ( index === undefined ) { return slice.call(this); }
    return ( index < 0 ? this[index + this.length] : this[index] );
  },

  index(elem) {
    if (!elem) {
      return slice.call(cash(this[0]).parent().children()).indexOf(this[0]);
    } else {
      return slice.call(cash(elem).children()).indexOf(this[0]);
    }
  },

  last() {
    return this.eq(-1);
  },

  map(callback) {
	  return map.call(this,callback);
  }

});
