fn.extend({

  children(selector) {
    if (!selector) {
      return cash.fn.extend(this[0].children, cash.fn);
    } else {
      return cash(this[0].children).filter(v => {
        return cash.matches(v, selector);
      });
    }
  },

  closest(selector) {
    if (!selector || cash.matches(this[0], selector)) {
      return this;
    } else {
      return this.parent().closest(selector);
    }
  },

  is(selector) {
    if (!selector) {
      return false;
    }

    if (selector.cash) {
      return this[0] === selector[0];
    }

    return typeof selector === 'string' ? cash.matches(this[0], selector) : false;
  },

  find(selector) {
    return cash.fn.extend(this[0].querySelectorAll(selector), cash.fn);
  },

  has(selector) {
    return filter.call(this, el => {
      return cash(el).find(selector).length !== 0;
    });
  },

  next() {
    return cash(this[0].nextElementSibling);
  },

  not(selector) {
    return filter.call(this, el => {
      return !cash.matches(el, selector);
    });
  },

  parent() {
    var result = ArrayProto.map.call(this, item => {
      return item.parentElement || doc.body.parentNode;
    });

    return cash.unique(result);
  },

  parents(selector) {
    var last,
        result = [],
        count = 0;

    this.each(item => {
      last = item;

      while (last !== doc.body.parentNode) {
        last = last.parentElement;

        if (!selector || (selector && cash.matches(last, selector))) {
          result[count] = last;
          count++;
        }
      }
    });

    return cash.unique(result);
  },

  prev() {
    return cash(this[0].previousElementSibling);
  },

  siblings() {
    var collection = this.parent().children(),
        el = this[0];

    return filter.call(collection, i => i !== el);
  }

});
