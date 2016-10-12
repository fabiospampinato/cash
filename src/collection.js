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
    if ( !selector ) { return this; }

    var comparator = ( isFunction(selector) ? selector : getCompareFunction(selector ));

    return cash( filter.call(this, e => comparator(e, selector) ) );
  },

  first() {
    return this.eq(0);
  },

  get(index) {
    if ( index === undefined ) { return slice.call(this); }
    return ( index < 0 ? this[index + this.length] : this[index] );
  },

  index(elem) {
    var child = elem ? cash(elem)[0] : this[0],
        collection = elem ? this : cash(child).parent().children();
    return slice.call( collection ).indexOf(child);
  },

  last() {
    return this.eq(-1);
  }

});
