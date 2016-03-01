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
  var doc = document, win = window, ArrayProto = Array.prototype, slice = ArrayProto.slice, filter = ArrayProto.filter, map = ArrayProto.map, push = ArrayProto.push;

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
    init: Init
  };

  cash.parseHTML = parseHTML;

  cash.extend = fn.extend = function (target, source) {
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
    each: function (collection, callback) {
      var l = collection.length, i = 0;

      for (; i < l; i++) {
        if (callback.call(collection[i], collection[i], i, collection) === false) {
          break;
        }
      }
    },

    matches: function (el, selector) {
      return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
    },

    merge: function (first, second) {
      var len = +second.length, i = first.length, j = 0;

      for (; j < len; i++, j++) {
        first[i] = second[j];
      }

      first.length = i;
      return first;
    },

    unique: function (collection) {
      return cash.merge(cash(), slice.call(collection).filter(function (item, index, self) {
        return self.indexOf(item) === index;
      }));
    },

    noop: noop,
    isFunction: isFunction,
    isString: isString,
    isArray: Array.isArray,
    isNumeric: function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

  });

  var notWhiteMatch = /\S+/g;

  fn.extend({
    addClass: function (c) {
      var classes = c.match(notWhiteMatch);

      return this.each(function (v) {
        var spacedName = " " + v.className + " ";
        cash.each(classes, function (c) {
          if (v.classList) {
            v.classList.add(c);
          } else if (spacedName.indexOf(" " + c + " ")) {
            v.className += " " + c;
          }
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
        check = (v.classList ? v.classList.contains(c) : new RegExp("(^| )" + c + "( |$)", "gi").test(v.className));
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
        cash.each(classes, function (c) {
          if (v.classList) {
            v.classList.remove(c);
          } else {
            v.className = v.className.replace(c, "");
          }
        });
      });
    } });

  fn.extend({
    add: function () {
      var arr = slice.call(this), i = 0, l;

      for (l = arguments.length; i < l; i++) {
        arr = arr.concat(slice.call(cash(arguments[i])));
      }

      return cash.unique(arr);
    },

    each: function (callback) {
      cash.each(this, callback);
      return this;
    },

    eq: function (index) {
      return cash(this.get(index));
    },

    filter: function (selector) {
      return filter.call(this, (isString(selector) ? function (e) {
        return cash.matches(e, selector);
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
      if (!elem) {
        return slice.call(cash(this[0]).parent().children()).indexOf(this[0]);
      } else {
        return slice.call(cash(elem).children()).indexOf(this[0]);
      }
    },

    last: function () {
      return this.eq(-1);
    },

    map: function (callback) {
      return map.call(this, callback);
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
      if (margins === true) {
        return this[0].offsetWidth + (compute(this, "margin-left") || compute(this, "marginLeft") || 0) + (compute(this, "margin-right") || compute(this, "marginRight") || 0);
      }

      return this[0].offsetWidth;
    },

    outerHeight: function (margins) {
      if (margins === true) {
        return this[0].offsetHeight + (compute(this, "margin-top") || compute(this, "marginTop") || 0) + (compute(this, "margin-bottom") || compute(this, "marginBottom") || 0);
      }

      return this[0].offsetHeight;
    },

    width: function () {
      return this[0].getBoundingClientRect().width;
    }

  });

  var _eventCache = {};

  function guid() {
    function _p8(s) {
      var p = (Math.random().toString(16) + "000000000").substr(2, 8);
      return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }

    return _p8() + _p8(true) + _p8(true) + _p8();
  }

  function registerEvent(node, eventName, callback) {
    var nid = cash(node).data("cshid") || guid();

    cash(node).data("cshid", nid);

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
      this.each(function (v) {
        if (callback) {
          v.removeEventListener(eventName, callback);
        } else {
          for (var i in _eventCache[cash(v).data("cshid")][eventName]) {
            v.removeEventListener(eventName, _eventCache[cash(v).data("cshid")][eventName][i]);
          }
        }
      });

      return this;
    },

    on: function (eventName, delegate, callback) {
      if (typeof delegate === "function") {
        callback = delegate;

        this.each(function (v) {
          registerEvent(cash(v), eventName, callback);
          v.addEventListener(eventName, callback);
        });
        return this;
      } else {
        this.each(function (v) {
          function handler(e) {
            var t = e.target;

            if (cash.matches(t, delegate)) {
              callback.call(t);
            } else {
              while (!cash.matches(t, delegate)) {
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

        return this;
      }
    },

    ready: function (callback) {
      this[0].addEventListener("DOMContentLoaded", callback);
    },

    trigger: function (eventName) {
      var evt = doc.createEvent("HTMLEvents");
      evt.initEvent(eventName, true, false);
      this.each(function (v) {
        return v.dispatchEvent(evt);
      });
      return this;
    }

  });

  function encode(e) {
    return encodeURIComponent(e).replace(/%20/g, "+");
  }

  fn.extend({
    serialize: function () {
      var formEl = this[0].elements, query = "";

      cash.each(formEl, function (field) {
        if (field.name && field.type !== "file" && field.type !== "reset") {
          if (field.type === "select-multiple") {
            cash.each(field.options, function (o) {
              if (o.selected) {
                query += "&" + field.name + "=" + encode(o.value);
              }
            });
          } else if ((field.type !== "submit" && field.type !== "button")) {
            query += "&" + field.name + "=" + encode(field.value);
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
      cash.each(child, function () {
        insertContent(parent, this, prepend);
      });
      return;
    }

    parent.each(str ? function () {
      this.insertAdjacentHTML(prepend ? "afterbegin" : "beforeend", child);
    } : function (el, i) {
      insertElement(el, (i === 0 ? child : child.cloneNode(true)), prepend);
    });
  }

  fn.extend({
    append: function (content) {
      insertContent(this, content);
      return this;
    },

    appendTo: function (parent) {
      insertContent(cash(parent), this);
      return this;
    },

    clone: function () {
      var elems = [];
      this.each(function (v) {
        elems.push(v.cloneNode(true));
      });
      return cash(elems);
    },

    empty: function () {
      this.html("");
      return this;
    },

    html: function (content) {
      var source;
      if (content === undefined) {
        return this[0].innerHTML;
      }
      source = (content.nodeType ? content[0].outerHTML : content);
      return this.each(function (v) {
        return v.innerHTML = source;
      });
    },

    insertAfter: function (selector) {
      cash(selector)[0].insertAdjacentHTML("afterend", this[0].outerHTML);
      return this;
    },

    insertBefore: function (selector) {
      cash(selector)[0].insertAdjacentHTML("beforebegin", this[0].outerHTML);
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
      elems = cash.unique(elems);

      return (!selector ? elems : elems.filter(function (v) {
        return cash.matches(v, selector);
      }));
    },

    closest: function (selector) {
      if (!selector || cash.matches(this[0], selector)) {
        return this;
      }
      return this.parent().closest(selector);
    },

    is: function (selector) {
      if (!selector) {
        return false;
      }

      var match = false, comparator = (isString(selector) ? cash.matches : selector.cash ? function (el) {
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

      return cash.unique(elems);
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
        return !cash.matches(el, selector);
      });
    },

    parent: function () {
      var result = this.map(function (item) {
        return item.parentElement || doc.body.parentNode;
      });

      return cash.unique(result);
    },

    parents: function (selector) {
      var last, result = [];

      this.each(function (item) {
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