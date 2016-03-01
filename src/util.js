cash.extend = fn.extend = function(target, source) {
  var prop;

  if (!source) {
    source = target;
    target = this;
  }

  for (prop in source) {
    if (source.hasOwnProperty(prop)) {
      target[prop] = source[prop];
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

cash.extend({

	each: each,

	matches(el, selector) {
	  return (
	    el.matches ||
	    el.webkitMatchesSelector ||
	    el.mozMatchesSelector ||
	    el.msMatchesSelector ||
	    el.oMatchesSelector
	  ).call(el, selector);
	},

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

	unique(collection) {
	  return cash(slice.call(collection).filter((item, index, self) => {
	    return self.indexOf(item) === index;
	  }));
	},

	noop: noop,
	isFunction: isFunction,
	isString: isString,
	isArray: Array.isArray,
	isNumeric(n) { return !isNaN(parseFloat(n)) && isFinite(n); }

});
