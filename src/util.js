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

cash.extend({

	each: (collection, callback) => {
	  var l = collection.length,
	      i = 0;

	  for (; i < l; i++) {
	    if ( callback.call(collection[i], collection[i], i, collection) === false ) { break; }
	  }
	},

	matches: (el, selector) => {
	  return (
	    el.matches ||
	    el.matchesSelector ||
	    el.msMatchesSelector ||
	    el.mozMatchesSelector ||
	    el.webkitMatchesSelector ||
	    el.oMatchesSelector
	  ).call(el, selector);
	},

	merge: (first, second) => {
	  var len = +second.length,
	      i = first.length,
	      j = 0;

	  for (; j < len; i++, j++) {
	    first[i] = second[j];
	  }

	  first.length = i;
	  return first;
	},

	unique: collection => {
	  return cash.merge(cash(), slice.call(collection).filter((item, index, self) => {
	    return self.indexOf(item) === index;
	  }));
	}

});
