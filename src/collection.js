fn.extend({

  add(selector, context) {
    return unique(cash.merge(this, cash(selector, context)));
  },

  each(callback) {
    each(this, callback);
    return this;
  },

  eq(index) {
    return cash(this.get(index));
  },

  filter(selector) {
    return filter.call(this, ( isString(selector) ? e => matches(e, selector) : selector ));
  },

  first() {
    return this.eq(0);
  },

  get(index) {
    if ( index === undefined ) { return slice.call(this); }
    return ( index < 0 ? this[index + this.length] : this[index] );
  },

  index(elem) {
    var f = this[0];
    return slice.call( elem ? cash(elem) : cash(f).parent().children() ).indexOf(f);
  },

  last() {
    return this.eq(-1);
  }

});
