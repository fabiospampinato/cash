fn.extend({

  add(selector, context) {
	  return cash.unique(cash.merge(this.get(), cash(selector, context)));
  },

  each(callback) {
    each(this, callback);
    return this;
  },

  eq(index) {
    return cash(this.get(index));
  },

  filter(selector) {
	  return filter.call(this, ( isString(selector) ? e => cash.matches(e, selector) : selector ));
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
