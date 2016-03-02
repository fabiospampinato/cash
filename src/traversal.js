function directCompare(el,selector){ return el === selector; }

fn.extend({

  children(selector) {
    var elems = [];
    this.each(el => { push.apply(elems,el.children); });
    elems = cash.unique(elems);

    return ( !selector ? elems : elems.filter(v => {
        return cash.matches(v, selector);
      }) );
  },

  closest(selector) {
    if (!selector || cash.matches(this[0], selector)) { return this; }
	  return this.parent().closest(selector);
  },

  is(selector) {
    if ( !selector ) { return false; }

    var match = false,
        comparator = (
        	isString(selector) ? cash.matches :
        	selector.cash ? el => { return selector.is(el); } :
        	directCompare
        );

    this.each((el,i) => {
      match = comparator(el,selector,i);
      return !match;
    });

    return match;
  },

  find(selector) {
    if ( !selector ) { return cash(); }

    var elems = [];
    this.each(el => { push.apply(elems,find(selector,el)); });

    return cash.unique(elems);
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
    var result = this.map(item => {
      return item.parentElement || doc.body.parentNode;
    });

    return cash.unique(result);
  },

  parents(selector) {
    var last,
        result = [];

    this.each(item => {
      last = item;

      while (last !== doc.body.parentNode) {
        last = last.parentElement;

        if (!selector || (selector && cash.matches(last, selector))) {
          result.push(last);
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
