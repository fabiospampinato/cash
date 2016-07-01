cash.extend = fn.extend = function(target) {
  target = target || {};

  var args = slice.call(arguments),
      length = args.length,
      i = 1;

  if ( args.length === 1) {
    target = this;
    i = 0;
  }

  for (; i < length; i++) {
    if (!args[i]) { continue; }
    for (var key in args[i]) {
      if ( args[i].hasOwnProperty(key) ) { target[key] = args[i][key]; }
    }
  }

  return target;
};

function each(collection, callback) {
  var l = collection.length,
      i = 0;

  for (; i < l; i++) {
    if ( callback.call(collection[i], collection[i], i, collection) === false ) { break; }
  }
}

function matches(el, selector) {
  var m = el && (
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector ||
    el.oMatchesSelector
  );
  return !!m && m.call(el, selector);
}

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

function unique(collection) {
  return cash(slice.call(collection).filter((item, index, self) => {
    return self.indexOf(item) === index;
  }));
}

cash.extend({

  merge(first, second) {
    var len = +second.length,
        i = first.length,
        j = 0;

    for (; j < len; i++, j++) {
      first[i] = second[j];
    }

    first.length = i;
    return first;
  },

  each: each,
  matches: matches,
  unique: unique,
  isArray: Array.isArray,
  isNumeric(n) { return !isNaN(parseFloat(n)) && isFinite(n); }

});
