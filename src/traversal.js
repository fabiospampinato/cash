fn.extend({

  children(selector) {
    var elems = [];
    this.each(el => { push.apply(elems,el.children); });
    elems = unique(elems);

    return (
      !selector ? elems :
      elems.filter(v => {
        return matches(v, selector);
      })
    );
  },

  closest(selector) {
    if ( !selector || this.length < 1 ) { return cash(); }
    if ( this.is(selector) ) { return this.filter(selector); }
    return this.parent().closest(selector);
  },

  is(selector) {
    if ( !selector ) { return false; }

    var match = false,
        comparator = getCompareFunction(selector);

    this.each(el => {
      match = comparator(el,selector);
      return !match;
    });

    return match;
  },

  find(selector) {
    if ( !selector || selector.nodeType ) {
      return cash( selector && this.has(selector).length ? selector : null );
    }

    var elems = [];
    this.each(el => { push.apply(elems, find(selector,el) ); });

    return unique(elems);
  },

  has(selector) {

    var comparator = (
      isString(selector) ? el => { return find(selector,el).length !== 0; } :
      el => { return el.contains(selector); }
    );

    return this.filter(comparator);
  },

  next() {
    return cash(this[0].nextElementSibling);
  },

  not(selector) {
    if ( !selector ) { return this; }

    var comparator = getCompareFunction(selector);

    return this.filter(el => {
      return !comparator(el, selector);
    });
  },

  parent() {
    var result = [];

    this.each(item => {
      if (item && item.parentNode) { result.push(item.parentNode); }
    });

    return unique(result);
  },

  parents(selector) {
    var last,
        result = [];

    this.each(item => {
      last = item;

      while ( last && last.parentNode && last !== doc.body.parentNode ) {
        last = last.parentNode;

        if (!selector || (selector && matches(last, selector))) {
          result.push(last);
        }
      }
    });

    return unique(result);
  },

  prev() {
    return cash(this[0].previousElementSibling);
  },

  siblings() {
    var collection = this.parent().children(),
        el = this[0];

    return collection.filter(i => i !== el);
  }

});
