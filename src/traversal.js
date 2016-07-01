function getCompareFunction(selector){
  return (
    /* Use browser's `matches` function if string */
    isString(selector) ? matches :
    /* Match a cash element */
    selector.cash ? el => { return selector.is(el); } :
    /* Direct comparison */
    function(el,selector){ return el === selector; }
  );
}

fn.extend({

  children(selector) {
    var elems = [];
    this.each(el => { push.apply(elems,el.children); });
    elems = unique(elems);

    return ( !selector ? elems : elems.filter(v => {
        return matches(v, selector);
      }) );
  },

  closest(selector) {
    if (!selector || matches(this[0], selector)) { return this; }
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
    if ( !selector ) { return cash(); }

    var elems = [];
    this.each(el => { push.apply(elems,find(selector,el)); });

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
    var result = this.map(item => {
      return item.parentElement || doc.body.parentNode;
    });

    return unique(result);
  },

  parents(selector) {
    var last,
        result = [];

    this.each(item => {
      last = item;

      while (last !== doc.body.parentNode) {
        last = last.parentElement;

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
