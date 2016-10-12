/*!
  cash-dom 1.3.5, https://github.com/kenwheeler/cash @license MIT
  */

;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    root.cash = root.$ = factory();
  }
})(this, function () {

  "use strict";

  var doc = document,
      win = window,
      ArrayProto = Array.prototype,
      slice = ArrayProto.slice,
      _filter = ArrayProto.filter,
      push = ArrayProto.push;

  var noop = function noop() {},
      isFunction = function isFunction(item) {
    // @see https://crbug.com/568448
    return typeof item === typeof noop && item.call;
  },
      isString = function isString(item) {
    return typeof item === typeof '';
  };

  var idMatch = /^#[\w-]*$/,
      classMatch = /^\.[\w-]*$/,
      htmlMatch = /<.+>/,
      singlet = /^\w+$/;

  function _find(selector, context) {
    context = context || doc;
    var elems = classMatch.test(selector) ? context.getElementsByClassName(selector.slice(1)) : singlet.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector);
    return elems;
  }

  var frag;
  function parseHTML(str) {
    if (!frag) {
      frag = doc.implementation.createHTMLDocument();
      var base = frag.createElement('base');
      base.href = doc.location.href;
      frag.head.appendChild(base);
    }

    frag.body.innerHTML = str;

    return frag.body.childNodes;
  }

  function onReady(fn) {
    if (doc.readyState !== 'loading') {
      fn();
    } else {
      doc.addEventListener('DOMContentLoaded', fn);
    }
  }

  function Init(selector, context) {

    if (!selector) {
      return this;
    }

    // If already a cash collection, don't do any further processing
    if (selector.cash && selector !== win) {
      return selector;
    }

    var elems = selector,
        i = 0,
        length;

    if (isString(selector)) {
      elems = idMatch.test(selector) ?
      // If an ID use the faster getElementById check
      doc.getElementById(selector.slice(1)) : htmlMatch.test(selector) ?
      // If HTML, parse it into real elements
      parseHTML(selector) :
      // else use `find`
      _find(selector, context);

      // If function, use as shortcut for DOM ready
    } else if (isFunction(selector)) {
      onReady(selector);return this;
    }

    if (!elems) {
      return this;
    }

    // If a single DOM element is passed in or received via ID, return the single element
    if (elems.nodeType || elems === win) {
      this[0] = elems;
      this.length = 1;
    } else {
      // Treat like an array and loop through each item.
      length = this.length = elems.length;
      for (; i < length; i++) {
        this[i] = elems[i];
      }
    }

    return this;
  }

  function cash(selector, context) {
    return new Init(selector, context);
  }

  var fn = cash.fn = cash.prototype = Init.prototype = { // jshint ignore:line
    cash: true,
    length: 0,
    push: push,
    splice: ArrayProto.splice,
    map: ArrayProto.map,
    init: Init
  };

  Object.defineProperty(fn, 'constructor', { value: cash });

  cash.parseHTML = parseHTML;
  cash.noop = noop;
  cash.isFunction = isFunction;
  cash.isString = isString;
  cash.extend = fn.extend = function (target) {
    target = target || {};

    var args = slice.call(arguments),
        length = args.length,
        i = 1;

    if (args.length === 1) {
      target = this;
      i = 0;
    }

    for (; i < length; i++) {
      if (!args[i]) {
        continue;
      }
      for (var key in args[i]) {
        if (args[i].hasOwnProperty(key)) {
          target[key] = args[i][key];
        }
      }
    }

    return target;
  };

  function _each(collection, callback) {
    var l = collection.length,
        i = 0;

    for (; i < l; i++) {
      if (callback.call(collection[i], collection[i], i, collection) === false) {
        break;
      }
    }
  }

  function matches(el, selector) {
    var m = el && (el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector || el.oMatchesSelector);
    return !!m && m.call(el, selector);
  }

  function getCompareFunction(selector) {
    return (
      /* Use browser's `matches` function if string */
      isString(selector) ? matches :
      /* Match a cash element */
      selector.cash ? function (el) {
        return selector.is(el);
      } :
      /* Direct comparison */
      function (el, selector) {
        return el === selector;
      }
    );
  }

  function unique(collection) {
    return cash(slice.call(collection).filter(function (item, index, self) {
      return self.indexOf(item) === index;
    }));
  }

  cash.extend({
    merge: function merge(first, second) {
      var len = +second.length,
          i = first.length,
          j = 0;

      for (; j < len; i++, j++) {
        first[i] = second[j];
      }

      first.length = i;
      return first;
    },


    each: _each,
    matches: matches,
    unique: unique,
    isArray: Array.isArray,
    isNumeric: function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
  });
  var uid = cash.uid = '_cash' + Date.now();

  function getDataCache(node) {
    return node[uid] = node[uid] || {};
  }

  function setData(node, key, value) {
    return getDataCache(node)[key] = value;
  }

  function getData(node, key) {
    var c = getDataCache(node);
    if (c[key] === undefined) {
      c[key] = node.dataset ? node.dataset[key] : cash(node).attr('data-' + key);
    }
    return c[key];
  }

  function _removeData(node, key) {
    var c = getDataCache(node);
    if (c) {
      delete c[key];
    } else if (node.dataset) {
      delete node.dataset[key];
    } else {
      cash(node).removeAttr('data-' + name);
    }
  }

  fn.extend({
    data: function data(name, value) {

      if (isString(name)) {
        return value === undefined ? getData(this[0], name) : this.each(function (v) {
          return setData(v, name, value);
        });
      }

      for (var key in name) {
        this.data(key, name[key]);
      }

      return this;
    },
    removeData: function removeData(key) {
      return this.each(function (v) {
        return _removeData(v, key);
      });
    }
  });
  var notWhiteMatch = /\S+/g;

  function getClasses(c) {
    return isString(c) && c.match(notWhiteMatch);
  }

  function _hasClass(v, c) {
    return v.classList ? v.classList.contains(c) : new RegExp('(^| )' + c + '( |$)', 'gi').test(v.className);
  }

  function _addClass(v, c, spacedName) {
    if (v.classList) {
      v.classList.add(c);
    } else if (spacedName.indexOf(' ' + c + ' ')) {
      v.className += ' ' + c;
    }
  }

  function _removeClass(v, c) {
    if (v.classList) {
      v.classList.remove(c);
    } else {
      v.className = v.className.replace(c, '');
    }
  }

  fn.extend({
    addClass: function addClass(c) {
      var classes = getClasses(c);

      return classes ? this.each(function (v) {
        var spacedName = ' ' + v.className + ' ';
        _each(classes, function (c) {
          _addClass(v, c, spacedName);
        });
      }) : this;
    },
    attr: function attr(name, value) {
      if (!name) {
        return undefined;
      }

      if (isString(name)) {
        if (value === undefined) {
          return this[0] ? this[0].getAttribute ? this[0].getAttribute(name) : this[0][name] : undefined;
        }

        return this.each(function (v) {
          if (v.setAttribute) {
            v.setAttribute(name, value);
          } else {
            v[name] = value;
          }
        });
      }

      for (var key in name) {
        this.attr(key, name[key]);
      }

      return this;
    },
    hasClass: function hasClass(c) {
      var check = false,
          classes = getClasses(c);
      if (classes && classes.length) {
        this.each(function (v) {
          check = _hasClass(v, classes[0]);
          return !check;
        });
      }
      return check;
    },
    prop: function prop(name, value) {

      if (isString(name)) {
        return value === undefined ? this[0][name] : this.each(function (v) {
          v[name] = value;
        });
      }

      for (var key in name) {
        this.prop(key, name[key]);
      }

      return this;
    },
    removeAttr: function removeAttr(name) {
      return this.each(function (v) {
        if (v.removeAttribute) {
          v.removeAttribute(name);
        } else {
          delete v[name];
        }
      });
    },
    removeClass: function removeClass(c) {
      if (!arguments.length) {
        return this.attr('class', '');
      }
      var classes = getClasses(c);
      return classes ? this.each(function (v) {
        _each(classes, function (c) {
          _removeClass(v, c);
        });
      }) : this;
    },
    removeProp: function removeProp(name) {
      return this.each(function (v) {
        delete v[name];
      });
    },
    toggleClass: function toggleClass(c, state) {
      if (state !== undefined) {
        return this[state ? 'addClass' : 'removeClass'](c);
      }
      var classes = getClasses(c);
      return classes ? this.each(function (v) {
        var spacedName = ' ' + v.className + ' ';
        _each(classes, function (c) {
          if (_hasClass(v, c)) {
            _removeClass(v, c);
          } else {
            _addClass(v, c, spacedName);
          }
        });
      }) : this;
    }
  });
  fn.extend({
    add: function add(selector, context) {
      return unique(cash.merge(this, cash(selector, context)));
    },
    each: function each(callback) {
      _each(this, callback);
      return this;
    },
    eq: function eq(index) {
      return cash(this.get(index));
    },
    filter: function filter(selector) {
      if (!selector) {
        return this;
      }

      var comparator = isFunction(selector) ? selector : getCompareFunction(selector);

      return cash(_filter.call(this, function (e) {
        return comparator(e, selector);
      }));
    },
    first: function first() {
      return this.eq(0);
    },
    get: function get(index) {
      if (index === undefined) {
        return slice.call(this);
      }
      return index < 0 ? this[index + this.length] : this[index];
    },
    index: function index(elem) {
      var child = elem ? cash(elem)[0] : this[0],
          collection = elem ? this : cash(child).parent().children();
      return slice.call(collection).indexOf(child);
    },
    last: function last() {
      return this.eq(-1);
    }
  });
  var camelCase = function () {
    var camelRegex = /(?:^\w|[A-Z]|\b\w)/g,
        whiteSpace = /[\s-_]+/g;
    return function (str) {
      return str.replace(camelRegex, function (letter, index) {
        return letter[index === 0 ? 'toLowerCase' : 'toUpperCase']();
      }).replace(whiteSpace, '');
    };
  }();

  var getPrefixedProp = function () {
    var cache = {},
        doc = document,
        div = doc.createElement('div'),
        style = div.style;

    return function (prop) {
      prop = camelCase(prop);
      if (cache[prop]) {
        return cache[prop];
      }

      var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
          prefixes = ['webkit', 'moz', 'ms', 'o'],
          props = (prop + ' ' + prefixes.join(ucProp + ' ') + ucProp).split(' ');

      _each(props, function (p) {
        if (p in style) {
          cache[p] = prop = cache[prop] = p;
          return false;
        }
      });

      return cache[prop];
    };
  }();

  cash.prefixedProp = getPrefixedProp;
  cash.camelCase = camelCase;

  fn.extend({
    css: function css(prop, value) {
      if (isString(prop)) {
        prop = getPrefixedProp(prop);
        return arguments.length > 1 ? this.each(function (v) {
          return v.style[prop] = value;
        }) : win.getComputedStyle(this[0])[prop];
      }

      for (var key in prop) {
        this.css(key, prop[key]);
      }

      return this;
    }
  });
  function compute(el, prop) {
    return parseInt(win.getComputedStyle(el[0], null)[prop], 10) || 0;
  }

  _each(['Width', 'Height'], function (v) {

    var lower = v.toLowerCase();

    fn[lower] = function () {
      return this[0].getBoundingClientRect()[lower];
    };

    fn['inner' + v] = function () {
      return this[0]['client' + v];
    };

    fn['outer' + v] = function (margins) {
      return this[0]['offset' + v] + (margins ? compute(this, 'margin' + (v === 'Width' ? 'Left' : 'Top')) + compute(this, 'margin' + (v === 'Width' ? 'Right' : 'Bottom')) : 0);
    };
  });
  function registerEvent(node, eventName, callback) {
    var eventCache = getData(node, '_cashEvents') || setData(node, '_cashEvents', {});
    eventCache[eventName] = eventCache[eventName] || [];
    eventCache[eventName].push(callback);
    node.addEventListener(eventName, callback);
  }

  function removeEvent(node, eventName, callback) {
    var events = getData(node, '_cashEvents'),
        eventCache = events && events[eventName],
        index;

    if (!eventCache) {
      return;
    }

    if (callback) {
      node.removeEventListener(eventName, callback);
      index = eventCache.indexOf(callback);
      if (index >= 0) {
        eventCache.splice(index, 1);
      }
    } else {
      _each(eventCache, function (event) {
        node.removeEventListener(eventName, event);
      });
      eventCache = [];
    }
  }

  fn.extend({
    off: function off(eventName, callback) {
      return this.each(function (v) {
        return removeEvent(v, eventName, callback);
      });
    },
    on: function on(eventName, delegate, callback, runOnce) {
      // jshint ignore:line

      var originalCallback;

      if (!isString(eventName)) {
        for (var key in eventName) {
          this.on(key, delegate, eventName[key]);
        }
        return this;
      }

      if (isFunction(delegate)) {
        callback = delegate;
        delegate = null;
      }

      if (eventName === 'ready') {
        onReady(callback);
        return this;
      }

      if (delegate) {
        originalCallback = callback;
        callback = function callback(e) {
          var t = e.target;

          while (!matches(t, delegate)) {
            if (t === this) {
              return t = false;
            }
            t = t.parentNode;
          }

          if (t) {
            originalCallback.call(t, e);
          }
        };
      }

      return this.each(function (v) {
        var _finalCallback = callback;
        if (runOnce) {
          _finalCallback = function finalCallback() {
            callback.apply(this, arguments);
            removeEvent(v, eventName, _finalCallback);
          };
        }
        registerEvent(v, eventName, _finalCallback);
      });
    },
    one: function one(eventName, delegate, callback) {
      return this.on(eventName, delegate, callback, true);
    },


    ready: onReady,

    trigger: function trigger(eventName, data) {
      var evt = doc.createEvent('HTMLEvents');
      evt.data = data;
      evt.initEvent(eventName, true, false);
      return this.each(function (v) {
        return v.dispatchEvent(evt);
      });
    }
  });
  function encode(name, value) {
    return '&' + encodeURIComponent(name) + '=' + encodeURIComponent(value).replace(/%20/g, '+');
  }

  function getSelectMultiple_(el) {
    var values = [];
    _each(el.options, function (o) {
      if (o.selected) {
        values.push(o.value);
      }
    });
    return values.length ? values : null;
  }

  function getSelectSingle_(el) {
    var selectedIndex = el.selectedIndex;
    return selectedIndex >= 0 ? el.options[selectedIndex].value : null;
  }

  function getValue(el) {
    var type = el.type;
    if (!type) {
      return null;
    }
    switch (type.toLowerCase()) {
      case 'select-one':
        return getSelectSingle_(el);
      case 'select-multiple':
        return getSelectMultiple_(el);
      case 'radio':
        return el.checked ? el.value : null;
      case 'checkbox':
        return el.checked ? el.value : null;
      default:
        return el.value ? el.value : null;
    }
  }

  fn.extend({
    serialize: function serialize() {
      var query = '';

      _each(this[0].elements || this, function (el) {
        if (el.disabled || el.tagName === 'FIELDSET') {
          return;
        }
        var name = el.name;
        switch (el.type.toLowerCase()) {
          case 'file':
          case 'reset':
          case 'submit':
          case 'button':
            break;
          case 'select-multiple':
            var values = getValue(el);
            if (values !== null) {
              _each(values, function (value) {
                query += encode(name, value);
              });
            }
            break;
          default:
            var value = getValue(el);
            if (value !== null) {
              query += encode(name, value);
            }
        }
      });

      return query.substr(1);
    },
    val: function val(value) {
      if (value === undefined) {
        return getValue(this[0]);
      } else {
        return this.each(function (v) {
          return v.value = value;
        });
      }
    }
  });
  function insertElement(el, child, prepend) {
    if (prepend) {
      var first = el.childNodes[0];
      el.insertBefore(child, first);
    } else {
      el.appendChild(child);
    }
  }

  function insertContent(parent, child, prepend) {
    var str = isString(child);

    if (!str && child.length) {
      _each(child, function (v) {
        return insertContent(parent, v, prepend);
      });
      return;
    }

    _each(parent, str ? function (v) {
      return v.insertAdjacentHTML(prepend ? 'afterbegin' : 'beforeend', child);
    } : function (v, i) {
      return insertElement(v, i === 0 ? child : child.cloneNode(true), prepend);
    });
  }

  fn.extend({
    after: function after(selector) {
      cash(selector).insertAfter(this);
      return this;
    },
    append: function append(content) {
      insertContent(this, content);
      return this;
    },
    appendTo: function appendTo(parent) {
      insertContent(cash(parent), this);
      return this;
    },
    before: function before(selector) {
      cash(selector).insertBefore(this);
      return this;
    },
    clone: function clone() {
      return cash(this.map(function (v) {
        return v.cloneNode(true);
      }));
    },
    empty: function empty() {
      this.html('');
      return this;
    },
    html: function html(content) {
      if (content === undefined) {
        return this[0].innerHTML;
      }
      var source = content.nodeType ? content[0].outerHTML : content;
      return this.each(function (v) {
        return v.innerHTML = source;
      });
    },
    insertAfter: function insertAfter(selector) {
      var _this = this;

      cash(selector).each(function (el, i) {
        var parent = el.parentNode,
            sibling = el.nextSibling;
        _this.each(function (v) {
          parent.insertBefore(i === 0 ? v : v.cloneNode(true), sibling);
        });
      });

      return this;
    },
    insertBefore: function insertBefore(selector) {
      var _this2 = this;

      cash(selector).each(function (el, i) {
        var parent = el.parentNode;
        _this2.each(function (v) {
          parent.insertBefore(i === 0 ? v : v.cloneNode(true), el);
        });
      });
      return this;
    },
    prepend: function prepend(content) {
      insertContent(this, content, true);
      return this;
    },
    prependTo: function prependTo(parent) {
      insertContent(cash(parent), this, true);
      return this;
    },
    remove: function remove() {
      return this.each(function (v) {
        return v.parentNode.removeChild(v);
      });
    },
    text: function text(content) {
      if (content === undefined) {
        return this[0].textContent;
      }
      return this.each(function (v) {
        return v.textContent = content;
      });
    }
  });
  var docEl = doc.documentElement;

  fn.extend({
    position: function position() {
      var el = this[0];
      return {
        left: el.offsetLeft,
        top: el.offsetTop
      };
    },
    offset: function offset() {
      var rect = this[0].getBoundingClientRect();
      return {
        top: rect.top + win.pageYOffset - docEl.clientTop,
        left: rect.left + win.pageXOffset - docEl.clientLeft
      };
    },
    offsetParent: function offsetParent() {
      return cash(this[0].offsetParent);
    }
  });
  fn.extend({
    children: function children(selector) {
      var elems = [];
      this.each(function (el) {
        push.apply(elems, el.children);
      });
      elems = unique(elems);

      return !selector ? elems : elems.filter(function (v) {
        return matches(v, selector);
      });
    },
    closest: function closest(selector) {
      if (!selector || this.length < 1) {
        return cash();
      }
      if (this.is(selector)) {
        return this.filter(selector);
      }
      return this.parent().closest(selector);
    },
    is: function is(selector) {
      if (!selector) {
        return false;
      }

      var match = false,
          comparator = getCompareFunction(selector);

      this.each(function (el) {
        match = comparator(el, selector);
        return !match;
      });

      return match;
    },
    find: function find(selector) {
      if (!selector || selector.nodeType) {
        return cash(selector && this.has(selector).length ? selector : null);
      }

      var elems = [];
      this.each(function (el) {
        push.apply(elems, _find(selector, el));
      });

      return unique(elems);
    },
    has: function has(selector) {

      var comparator = isString(selector) ? function (el) {
        return _find(selector, el).length !== 0;
      } : function (el) {
        return el.contains(selector);
      };

      return this.filter(comparator);
    },
    next: function next() {
      return cash(this[0].nextElementSibling);
    },
    not: function not(selector) {
      if (!selector) {
        return this;
      }

      var comparator = getCompareFunction(selector);

      return this.filter(function (el) {
        return !comparator(el, selector);
      });
    },
    parent: function parent() {
      var result = [];

      this.each(function (item) {
        if (item && item.parentNode) {
          result.push(item.parentNode);
        }
      });

      return unique(result);
    },
    parents: function parents(selector) {
      var last,
          result = [];

      this.each(function (item) {
        last = item;

        while (last && last.parentNode && last !== doc.body.parentNode) {
          last = last.parentNode;

          if (!selector || selector && matches(last, selector)) {
            result.push(last);
          }
        }
      });

      return unique(result);
    },
    prev: function prev() {
      return cash(this[0].previousElementSibling);
    },
    siblings: function siblings() {
      var collection = this.parent().children(),
          el = this[0];

      return collection.filter(function (i) {
        return i !== el;
      });
    }
  });

  return cash;
});
