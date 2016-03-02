"use strict";

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(factory);
  } else if (typeof exports !== "undefined") {
    module.exports = factory();
  } else {
    root.cash = root.$ = factory();
  }
})(this, function () {
  var doc = document, win = window, ArrayProto = Array.prototype, slice = ArrayProto.slice, filter = ArrayProto.filter, push = ArrayProto.push;

  var noop = function () {}, isFunction = function (item) {
    return typeof item === typeof noop;
  }, isString = function (item) {
    return typeof item === typeof "";
  }, idOrHTML = /^\s*?(#([-\w]*)|<[\w\W]*>)\s*?$/, singletTagOrClass = /^(\.)?([\w-_]*)$/;

  function find(selector, context) {
    context = context || doc;
    var match = singletTagOrClass.exec(selector), elems = (match ? match[1] ? doc.getElementsByClassName(match[2]) : doc.getElementsByTagName(selector) : context.querySelectorAll(selector));
    return slice.call(elems);
  }

  function parseHTML(str) {
    var tmp = doc.implementation.createHTMLDocument();
    tmp.body.innerHTML = str;
    return slice.call(tmp.body.children);
  }

  function onReady(fn) {
    if (doc.readyState !== "loading") {
      fn();
    } else {
      doc.addEventListener("DOMContentLoaded", fn);
    }
  }

  function Init(selector, context) {
    var elems = selector, i = 0, match, length;

    if (!selector) {
      return this;
    }

    // If already a cash collection, don't do any further processing
    if (selector.cash) {
      return selector;
    }
    // If function, use as shortcut for DOM ready
    else if (isFunction(selector)) {
      onReady(selector);return this;
    } else if (isString(selector)) {
      match = idOrHTML.exec(selector);
      // If an ID use the faster getElementById check
      if (match && match[2]) {
        selector = doc.getElementById(match[2]);
        if (!selector) {
          return this;
        }
      }
      // If HTML, parse it into real elements, else use querySelectorAll
      else {
        elems = (match ? parseHTML(selector) : find(selector, context));
      }
    }

    // If a DOM element is passed in or received via ID return the single element
    if (selector.nodeType || selector === window) {
      this[0] = selector;
      this.length = 1;
    } else {
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

  var fn = cash.fn = cash.prototype = Init.prototype = {
    cash: true,
    length: 0,
    push: push,
    splice: ArrayProto.splice,
    map: ArrayProto.map,
    init: Init
  };

  cash.parseHTML = parseHTML;

  cash.extend = fn.extend = function (target) {
    target = target || {};

    var args = slice.call(arguments), length = args.length, i = 1;

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

  function each(collection, callback) {
    var l = collection.length, i = 0;

    for (; i < l; i++) {
      if (callback.call(collection[i], collection[i], i, collection) === false) {
        break;
      }
    }
  }

  function matches(el, selector) {
    return (el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector || el.oMatchesSelector).call(el, selector);
  }

  function unique(collection) {
    return cash(slice.call(collection).filter(function (item, index, self) {
      return self.indexOf(item) === index;
    }));
  }

  cash.extend({
    merge: function (first, second) {
      var len = +second.length, i = first.length, j = 0;

      for (; j < len; i++, j++) {
        first[i] = second[j];
      }

      first.length = i;
      return first;
    },

    each: each,
    matches: matches,
    unique: unique,
    noop: noop,
    isFunction: isFunction,
    isString: isString,
    isArray: Array.isArray,
    isNumeric: function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

  });

  var notWhiteMatch = /\S+/g;

  function hasClass(v, c) {
    return (v.classList ? v.classList.contains(c) : new RegExp("(^| )" + c + "( |$)", "gi").test(v.className));
  }

  function addClass(v, c, spacedName) {
    if (v.classList) {
      v.classList.add(c);
    } else if (spacedName.indexOf(" " + c + " ")) {
      v.className += " " + c;
    }
  }

  function removeClass(v, c) {
    if (v.classList) {
      v.classList.remove(c);
    } else {
      v.className = v.className.replace(c, "");
    }
  }

  fn.extend({
    addClass: function (c) {
      var classes = c.match(notWhiteMatch);

      return this.each(function (v) {
        var spacedName = " " + v.className + " ";
        each(classes, function (c) {
          addClass(v, c, spacedName);
        });
      });
    },

    attr: function (name, value) {
      if (!value) {
        return this[0].getAttribute(name);
      }
      return this.each(function (v) {
        return v.setAttribute(name, value);
      });
    },

    hasClass: function (c) {
      var check = false;
      this.each(function (v) {
        check = hasClass(v, c);
        return !check;
      });
      return check;
    },

    prop: function (name) {
      return this[0][name];
    },

    removeAttr: function (name) {
      return this.each(function (v) {
        return v.removeAttribute(name);
      });
    },

    removeClass: function (c) {
      var classes = c.match(notWhiteMatch);

      return this.each(function (v) {
        each(classes, function (c) {
          removeClass(v, c);
        });
      });
    },

    toggleClass: function (c, state) {
      if (state !== undefined) {
        return this[state ? "addClass" : "removeClass"](c);
      }
      var classes = c.match(notWhiteMatch);

      return this.each(function (v) {
        var spacedName = " " + v.className + " ";
        each(classes, function (c) {
          if (hasClass(v, c)) {
            removeClass(v, c);
          } else {
            addClass(v, c, spacedName);
          }
        });
      });
    } });

  fn.extend({
    add: function (selector, context) {
      return unique(cash.merge(this, cash(selector, context)));
    },

    each: function (callback) {
      each(this, callback);
      return this;
    },

    eq: function (index) {
      return cash(this.get(index));
    },

    filter: function (selector) {
      return filter.call(this, (isString(selector) ? function (e) {
        return matches(e, selector);
      } : selector));
    },

    first: function () {
      return this.eq(0);
    },

    get: function (index) {
      if (index === undefined) {
        return slice.call(this);
      }
      return (index < 0 ? this[index + this.length] : this[index]);
    },

    index: function (elem) {
      var f = this[0];
      return slice.call(elem ? cash(elem) : cash(f).parent().children()).indexOf(f);
    },

    last: function () {
      return this.eq(-1);
    }

  });

  fn.extend({
    css: function (prop, value) {
      if (typeof prop === "object") {
        return this.each(function (v) {
          for (var key in prop) {
            if (prop.hasOwnProperty(key)) {
              v.style[key] = prop[key];
            }
          }
        });
      } else if (value) {
        return this.each(function (v) {
          return v.style[prop] = value;
        });
      } else {
        return win.getComputedStyle(this[0], null)[prop];
      }
    }

  });

  fn.extend({
    data: function (key, value) {
      // TODO: tear out into module for IE9
      if (!value) {
        return this[0].dataset ? this[0].dataset[key] : cash(this[0]).attr("data-" + key);
      } else {
        return this.each(function (v) {
          if (v.dataset) {
            v.dataset[key] = value;
          } else {
            cash(v).attr("data-" + key, value);
          }
        });
      }
    },

    removeData: function (name) {
      // TODO: tear out into module for IE9
      return this.each(function (v) {
        if (v.dataset) {
          delete v.dataset[name];
        } else {
          cash(v).removeAttr("data-" + name);
        }
      });
    }

  });

  function compute(el, prop) {
    return parseInt(win.getComputedStyle(el[0], null)[prop], 10);
  }

  fn.extend({
    height: function () {
      return this[0].getBoundingClientRect().height;
    },

    innerWidth: function () {
      return this[0].clientWidth;
    },

    innerHeight: function () {
      return this[0].clientHeight;
    },

    outerWidth: function (margins) {
      return this[0].offsetWidth + (margins !== true ? 0 : (compute(this, "margin-left") || compute(this, "marginLeft") || 0) + (compute(this, "margin-right") || compute(this, "marginRight") || 0));
    },

    outerHeight: function (margins) {
      return this[0].offsetHeight + (margins !== true ? 0 : (compute(this, "margin-top") || compute(this, "marginTop") || 0) + (compute(this, "margin-bottom") || compute(this, "marginBottom") || 0));
    },

    width: function () {
      return this[0].getBoundingClientRect().width;
    }

  });

  var _eventCache = {}, _eventId = "cshid";

  function guid() {
    function _p8(s) {
      var p = (Math.random().toString(16) + "000000000").substr(2, 8);
      return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }

    return _p8() + _p8(true) + _p8(true) + _p8();
  }

  function registerEvent(node, eventName, callback) {
    var nid = cash(node).data(_eventId) || guid();

    cash(node).data(_eventId, nid);

    if (!(nid in _eventCache)) {
      _eventCache[nid] = {};
    }

    if (!(eventName in _eventCache[nid])) {
      _eventCache[nid][eventName] = [];
    }

    _eventCache[nid][eventName].push(callback);
  }

  fn.extend({
    off: function (eventName, callback) {
      return this.each(function (v) {
        if (callback) {
          v.removeEventListener(eventName, callback);
        } else {
          for (var i in _eventCache[cash(v).data(_eventId)][eventName]) {
            v.removeEventListener(eventName, _eventCache[cash(v).data(_eventId)][eventName][i]);
          }
        }
      });
    },

    on: function (eventName, delegate, callback) {
      if (isFunction(delegate)) {
        callback = delegate;

        return this.each(function (v) {
          registerEvent(cash(v), eventName, callback);
          v.addEventListener(eventName, callback);
        });
      }

      return this.each(function (v) {
        function handler(e) {
          var t = e.target;

          if (matches(t, delegate)) {
            callback.call(t);
          } else {
            while (!matches(t, delegate)) {
              if (t === v) {
                return (t = false);
              }
              t = t.parentNode;
            }

            if (t) {
              callback.call(t);
            }
          }
        }

        registerEvent(cash(v), eventName, handler);
        v.addEventListener(eventName, handler);
      });
    },

    ready: function (callback) {
      onReady(callback);
    },

    trigger: function (eventName) {
      var evt = doc.createEvent("HTMLEvents");
      evt.initEvent(eventName, true, false);
      return this.each(function (v) {
        return v.dispatchEvent(evt);
      });
    }

  });

  function encode(name, value) {
    return "&" + encodeURIComponent(name) + "=" + encodeURIComponent(value).replace(/%20/g, "+");
  }
  function isCheckable(field) {
    return field.type === "radio" || field.type === "checkbox";
  }

  var formExcludes = ["file", "reset", "submit", "button"];

  fn.extend({
    serialize: function () {
      var formEl = this[0].elements, query = "";

      each(formEl, function (field) {
        if (field.name && formExcludes.indexOf(field.type) < 0) {
          if (field.type === "select-multiple") {
            each(field.options, function (o) {
              if (o.selected) {
                query += encode(field.name, o.value);
              }
            });
          } else if (!isCheckable(field) || (isCheckable(field) && field.checked)) {
            query += encode(field.name, field.value);
          }
        }
      });

      return query.substr(1);
    },

    val: function (value) {
      if (value === undefined) {
        return this[0].value;
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
      each(child, function (v) {
        return insertContent(parent, v, prepend);
      });
      return;
    }

    each(parent, str ? function (v) {
      return v.insertAdjacentHTML(prepend ? "afterbegin" : "beforeend", child);
    } : function (v, i) {
      return insertElement(v, (i === 0 ? child : child.cloneNode(true)), prepend);
    });
  }

  fn.extend({
    after: function (selector) {
      cash(selector).insertAfter(this);
      return this;
    },

    append: function (content) {
      insertContent(this, content);
      return this;
    },

    appendTo: function (parent) {
      insertContent(cash(parent), this);
      return this;
    },

    before: function (selector) {
      cash(selector).insertBefore(this);
      return this;
    },

    clone: function () {
      return cash(this.map(function (v) {
        return v.cloneNode(true);
      }));
    },

    empty: function () {
      this.html("");
      return this;
    },

    html: function (content) {
      if (content === undefined) {
        return this[0].innerHTML;
      }
      var source = (content.nodeType ? content[0].outerHTML : content);
      return this.each(function (v) {
        return v.innerHTML = source;
      });
    },

    insertAfter: function (selector) {
      var _this = this;


      cash(selector).each(function (el, i) {
        var parent = el.parentNode, sibling = el.nextSibling;
        _this.each(function (v) {
          parent.insertBefore((i === 0 ? v : v.cloneNode(true)), sibling);
        });
      });

      return this;
    },

    insertBefore: function (selector) {
      var _this2 = this;
      cash(selector).each(function (el, i) {
        var parent = el.parentNode;
        _this2.each(function (v) {
          parent.insertBefore((i === 0 ? v : v.cloneNode(true)), el);
        });
      });
      return this;
    },

    prepend: function (content) {
      insertContent(this, content, true);
      return this;
    },

    prependTo: function (parent) {
      insertContent(cash(parent), this, true);
      return this;
    },

    remove: function () {
      return this.each(function (v) {
        return v.parentNode.removeChild(v);
      });
    },

    text: function (content) {
      if (!content) {
        return this[0].textContent;
      }
      return this.each(function (v) {
        return v.textContent = content;
      });
    }

  });

  function directCompare(el, selector) {
    return el === selector;
  }

  fn.extend({
    children: function (selector) {
      var elems = [];
      this.each(function (el) {
        push.apply(elems, el.children);
      });
      elems = unique(elems);

      return (!selector ? elems : elems.filter(function (v) {
        return matches(v, selector);
      }));
    },

    closest: function (selector) {
      if (!selector || matches(this[0], selector)) {
        return this;
      }
      return this.parent().closest(selector);
    },

    is: function (selector) {
      if (!selector) {
        return false;
      }

      var match = false, comparator = (isString(selector) ? matches : selector.cash ? function (el) {
        return selector.is(el);
      } : directCompare);

      this.each(function (el, i) {
        match = comparator(el, selector, i);
        return !match;
      });

      return match;
    },

    find: function (selector) {
      if (!selector) {
        return cash();
      }

      var elems = [];
      this.each(function (el) {
        push.apply(elems, find(selector, el));
      });

      return unique(elems);
    },

    has: function (selector) {
      return filter.call(this, function (el) {
        return cash(el).find(selector).length !== 0;
      });
    },

    next: function () {
      return cash(this[0].nextElementSibling);
    },

    not: function (selector) {
      return filter.call(this, function (el) {
        return !matches(el, selector);
      });
    },

    parent: function () {
      var result = this.map(function (item) {
        return item.parentElement || doc.body.parentNode;
      });

      return unique(result);
    },

    parents: function (selector) {
      var last, result = [];

      this.each(function (item) {
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

    prev: function () {
      return cash(this[0].previousElementSibling);
    },

    siblings: function () {
      var collection = this.parent().children(), el = this[0];

      return filter.call(collection, function (i) {
        return i !== el;
      });
    }

  });


  return cash;
});