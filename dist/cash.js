"use strict";

// @optional attributes/index.js
// @optional collection/index.js
// @optional css/index.js
// @optional data/index.js
// @optional dimensions/index.js
// @optional events/index.js
// @optional forms/index.js
// @optional manipulation/index.js
// @optional offset/index.js
// @optional traversal/index.js
// @require core/index.js
(function () {
  // @concat-content
  var specialRegExpCharactersRe = /[-[\]{}()*+?.,\\^$|#\s]/g;

  function escapeRegExp(str) {
    return str.replace(specialRegExpCharactersRe, '\\$&');
  } // @require ./escape_regexp.js


  function hasClass(ele, cls) {
    return ele.classList ? ele.classList.contains(cls) : new RegExp("(^| )" + escapeRegExp(cls) + "( |$)", 'gi').test(ele.className);
  } // @require ./has_class.js


  function addClass(ele, cls) {
    if (ele.classList) {
      ele.classList.add(cls);
    } else if (!hasClass(ele, cls)) {
      ele.className += " " + cls;
    }
  }

  function removeClass(ele, cls) {
    if (ele.classList) {
      ele.classList.remove(cls);
    } else {
      ele.className = ele.className.replace(cls, '');
    }
  }

  var doc = document,
      docEl = doc.documentElement,
      win = window,
      _Array$prototype = Array.prototype,
      push = _Array$prototype.push,
      slice = _Array$prototype.slice;
  var idRe = /^#[\w-]*$/,
      classRe = /^\.[\w-]*$/,
      htmlRe = /<.+>/,
      tagRe = /^\w+$/,
      notWhitespaceRe = /\S+/g,
      eventsSeparatorRe = /[,\s]+/g,
      querySpaceRe = /%20/g;
  var eventsNamespacesSeparator = '.';
  var datasNamespace = '__cash_datas__',
      eventsNamespace = '__cash_events__'; // @require ./variables.js

  function Cash(selector, context) {
    if (!selector) return this;
    if (selector.cash && selector !== win) return selector;
    var eles = selector;

    if (isString(selector)) {
      eles = idRe.test(selector) ? doc.getElementById(selector.slice(1)) : htmlRe.test(selector) ? parseHTML(selector) : find(selector, context);
    } else if (isFunction(selector)) {
      return this.ready(selector); //FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality
    }

    if (!eles) return this;

    if (eles.nodeType || eles === win) {
      this[0] = eles;
      this.length = 1;
    } else {
      this.length = eles.length;

      for (var i = 0, l = this.length; i < l; i++) {
        this[i] = eles[i];
      }
    }

    return this;
  }

  function cash(selector, context) {
    return new Cash(selector, context);
  }
  /* PROTOTYPE */


  var fn = cash.fn = cash.prototype = Cash.prototype = {
    init: Cash,
    cash: true,
    length: 0
  };
  Object.defineProperty(fn, 'constructor', {
    value: cash
  }); // @require ./cash.js

  var camelRe = /(?:^\w|[A-Z]|\b\w)/g,
      camelWhitespaceRe = /[\s-_]+/g;

  function camelCase(str) {
    return str.replace(camelRe, function (letter, index) {
      return letter[!index ? 'toLowerCase' : 'toUpperCase']();
    }).replace(camelWhitespaceRe, '');
  }

  ;
  cash.camelCase = camelCase; // @require ./cash.js

  function each(arr, callback) {
    for (var i = 0, l = arr.length; i < l; i++) {
      if (callback.call(arr[i], arr[i], i, arr) === false) break;
    }
  }

  cash.each = each; // @require ./cash.js

  function extend(target) {
    if (target === void 0) {
      target = this;
    }

    var args = arguments,
        length = args.length;

    for (var i = length < 2 ? 0 : 1; i < length; i++) {
      for (var key in args[i]) {
        target[key] = args[i][key];
      }
    }

    return target;
  }

  ;
  cash.extend = fn.extend = extend; // @require ./cash.js

  function find(selector, context) {
    if (context === void 0) {
      context = doc;
    }

    return classRe.test(selector) ? context.getElementsByClassName(selector.slice(1)) : tagRe.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector);
  } // @require ./cash.js


  var guid = 1;
  cash.guid = guid; // @require ./cash.js

  function matches(ele, selector) {
    var matches = ele && (ele.matches || ele.webkitMatchesSelector || ele.mozMatchesSelector || ele.msMatchesSelector || ele.oMatchesSelector);
    return !!matches && matches.call(ele, selector);
  }

  cash.matches = matches; // @require ./cash.js

  var fragment;

  function initFragment() {
    if (fragment) return;
    fragment = doc.implementation.createHTMLDocument('');
    var base = fragment.createElement('base');
    base.href = doc.location.href;
    fragment.head.appendChild(base);
  }

  function parseHTML(html) {
    initFragment();
    fragment.body.innerHTML = html;
    return fragment.body.childNodes;
  }

  cash.parseHTML = parseHTML; // @require ./cash.js

  function isFunction(x) {
    return typeof x === 'function';
  }

  cash.isFunction = isFunction;

  function isString(x) {
    return typeof x === 'string';
  }

  cash.isString = isString;

  function isNumeric(x) {
    return !isNaN(parseFloat(x)) && isFinite(x);
  }

  cash.isNumeric = isNumeric;
  var isArray = Array.isArray;
  cash.isArray = isArray; // @require ./matches.js
  // @require ./type_checking.js

  function getCompareFunction(selector) {
    return isString(selector) ? function (i, ele) {
      return matches(ele, selector);
    } : selector.cash ? function (i, ele) {
      return selector.is(ele);
    } : function (i, ele, selector) {
      return ele === selector;
    };
  } // @require ./cash.js


  function unique(arr) {
    return arr.filter(function (item, index, self) {
      return self.indexOf(item) === index;
    });
  }

  cash.unique = unique; // @require ./camel_case.js
  // @require ./cash.js
  // @require ./each.js
  // @require ./extend.js
  // @require ./find.js
  // @require ./get_compare_function.js
  // @require ./guid.js
  // @require ./matches.js
  // @require ./parse_html.js
  // @require ./type_checking.js
  // @require ./unique.js
  // @require ./variables.js
  // @require core/index.js

  function getClasses(cls) {
    return isString(cls) && cls.match(notWhitespaceRe);
  } // @require core/index.js


  fn.add = function (selector, context) {
    return cash(unique(this.get().concat(cash(selector, context).get())));
  }; // @require core/index.js


  fn.each = function (callback) {
    each(this, function (ele, i) {
      return callback.call(ele, i, ele);
    });
    return this;
  }; // @require collection/each.js
  // @require ./helpers/get_classes.js
  // @require ./helpers/add_class.js


  fn.addClass = function (cls) {
    var classes = getClasses(cls);
    if (!classes) return this;
    return this.each(function (i, ele) {
      each(classes, function (c) {
        return addClass(ele, c);
      });
    });
  }; // @require collection/each.js


  fn.attr = function (attr, value) {
    if (!attr || !this[0]) return;

    if (isString(attr)) {
      if (value === undefined) {
        return this[0].getAttribute ? this[0].getAttribute(attr) : this[0][attr];
      }

      return this.each(function (i, ele) {
        if (ele.setAttribute) {
          ele.setAttribute(attr, value);
        } else {
          ele[attr] = value;
        }
      });
    }

    for (var key in attr) {
      this.attr(key, attr[key]);
    }

    return this;
  }; // @require collection/each.js
  // @require ./helpers/get_classes.js
  // @require ./helpers/has_class.js


  fn.hasClass = function (cls) {
    var classes = getClasses(cls);
    if (!classes || !classes.length) return false;
    var check = false;
    this.each(function (i, ele) {
      check = hasClass(ele, classes[0]);
      return !check;
    });
    return check;
  }; // @require collection/each.js


  fn.prop = function (prop, value) {
    if (isString(prop)) {
      return value === undefined ? this[0] ? this[0][prop] : undefined : this.each(function (i, ele) {
        ele[prop] = value;
      });
    }

    for (var key in prop) {
      this.prop(key, prop[key]);
    }

    return this;
  }; // @require collection/each.js


  fn.removeAttr = function (attr) {
    return this.each(function (i, ele) {
      if (ele.removeAttribute) {
        ele.removeAttribute(attr);
      } else {
        delete ele[attr];
      }
    });
  }; // @require collection/each.js
  // @require ./helpers/get_classes.js
  // @require ./helpers/remove_class.js
  // @require ./attr.js


  fn.removeClass = function (cls) {
    if (cls === undefined) return this.attr('class', '');
    var classes = getClasses(cls);
    if (!classes) return this;
    return this.each(function (i, ele) {
      each(classes, function (c) {
        return removeClass(ele, c);
      });
    });
  }; // @require collection/each.js


  fn.removeProp = function (prop) {
    return this.each(function (i, ele) {
      delete ele[prop];
    });
  }; // @require collection/each.js
  // @require ./helpers/add_class.js
  // @require ./helpers/get_classes.js
  // @require ./helpers/has_class.js
  // @require ./helpers/remove_class.js
  // @require ./add_class.js
  // @require ./remove_class.js


  fn.toggleClass = function (cls, force) {
    if (force !== undefined) return this[force ? 'addClass' : 'removeClass'](cls);
    var classes = getClasses(cls);
    if (!classes) return this;
    return this.each(function (i, ele) {
      each(classes, function (c) {
        if (hasClass(ele, c)) {
          removeClass(ele, c);
        } else {
          addClass(ele, c);
        }
      });
    });
  }; // @optional ./add_class.js
  // @optional ./attr.js
  // @optional ./has_class.js
  // @optional ./prop.js
  // @optional ./remove_attr.js
  // @optional ./remove_class.js
  // @optional ./remove_prop.js
  // @optional ./toggle_class.js
  // @require core/index.js


  fn.get = function (index) {
    if (index === undefined) return slice.call(this);
    return index < 0 ? this[index + this.length] : this[index];
  }; // @require ./get.js


  fn.eq = function (index) {
    return cash(this.get(index));
  }; // @require collection/get.js


  fn.filter = function (selector) {
    if (!selector) return this;
    var comparator = isFunction(selector) ? selector : getCompareFunction(selector);
    return cash(this.get().filter(function (ele, i) {
      return comparator.call(ele, i, ele, selector);
    }));
  }; // @require ./eq.js


  fn.first = function () {
    return this.eq(0);
  }; // @require ./eq.js


  fn.last = function () {
    return this.eq(-1);
  }; // @require ./get.js


  fn.map = function (callback) {
    return cash(this.get().map(function (ele, i) {
      return callback.call(ele, i, ele);
    }));
  }; // @require core/index.js


  fn.slice = function () {
    return cash(slice.apply(this, arguments));
  }; // @require core/index.js


  function computeStyle(ele, prop) {
    var style = win.getComputedStyle(ele, null);
    return prop ? style[prop] : style;
  } // @require ./compute_style.js


  function computeStyleInt(ele, prop) {
    return parseInt(computeStyle(ele, prop), 10) || 0;
  } // @require core/camel_case.js
  // @require core/each.js


  var prefixedProps = {},
      div = doc.createElement('div'),
      style = div.style,
      stylePrefixes = ['webkit', 'moz', 'ms', 'o'];

  function prefixedProp(prop) {
    prop = camelCase(prop);
    if (prefixedProps[prop]) return prefixedProps[prop];
    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
        props = (prop + " " + stylePrefixes.join(ucProp + " ") + ucProp).split(' ');
    each(props, function (prop) {
      if (prop in style) {
        prefixedProps[prop] = prop = prefixedProps[prop] = prop;
        return false;
      }
    });
    return prefixedProps[prop];
  }

  ;
  cash.prefixedProp = prefixedProp;
  var numberProps = {
    animationIterationCount: true,
    columnCount: true,
    fillOpacity: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    widows: true,
    zIndex: true,
    zoom: true
  };

  function getSuffixedValue(prop, value) {
    return !numberProps[prop] && isNumeric(value) ? value + "px" : value;
  } // @require collection/each.js
  // @require ./helpers/get_prefixed_prop.js
  // @require ./helpers/get_suffixed_value.js


  fn.css = function (prop, value) {
    if (isString(prop)) {
      prop = prefixedProp(prop);
      value = arguments.length > 1 ? getSuffixedValue(prop, value) : value;
      return arguments.length > 1 ? this.each(function (i, ele) {
        ele.style[prop] = value;
      }) : this[0] ? win.getComputedStyle(this[0])[prop] : undefined;
    }

    for (var key in prop) {
      this.css(key, prop[key]);
    }

    return this;
  }; // @optional ./css.js


  function getDataCache(ele) {
    return ele[datasNamespace] = ele[datasNamespace] || {};
  } // @require attributes/attr.js
  // @require ./get_data_cache.js


  function getData(ele, key) {
    var cache = getDataCache(ele);

    if (!(key in cache)) {
      var value = ele.dataset ? ele.dataset[camelCase(key)] : cash(ele).attr("data-" + key);

      try {
        value = JSON.parse(value);
      } catch (e) {}

      cache[key] = value;
    }

    return cache[key];
  } // @require attributes/remove_attr.js
  // @require ./get_data_cache.js


  function removeData(ele, key) {
    var cache = getDataCache(ele);

    if (key in cache) {
      cache[key] = undefined;
    } else {
      if (ele.dataset) {
        delete ele.dataset[key];
      } else {
        cash(ele).removeAttr("data-" + key);
      }
    }
  } // @require ./get_data_cache.js


  function setData(ele, key, value) {
    return getDataCache(ele)[key] = value;
  } // @require collection/each.js
  // @require ./helpers/get_data.js
  // @require ./helpers/set_data.js


  fn.data = function (name, value) {
    if (isString(name)) {
      return value === undefined ? this[0] ? getData(this[0], name) : undefined : this.each(function (i, ele) {
        setData(ele, name, value);
      });
    }

    for (var key in name) {
      this.data(key, name[key]);
    }

    return this;
  }; // @require collection/each.js
  // @require ./helpers/remove_data.js


  fn.removeData = function (key) {
    return this.each(function (i, ele) {
      return removeData(ele, key);
    });
  }; // @optional ./data.js
  // @optional ./remove_data.js
  // @require css/helpers/compute_style_int.js


  function getExtraSpace(ele, xAxis) {
    return computeStyleInt(ele, "border" + (xAxis ? 'Left' : 'Top')) + computeStyleInt(ele, "padding" + (xAxis ? 'Left' : 'Top')) + computeStyleInt(ele, "padding" + (xAxis ? 'Right' : 'Bottom')) + computeStyleInt(ele, "border" + (xAxis ? 'Right' : 'Bottom'));
  } // @require core/index.js


  each(['Width', 'Height'], function (prop) {
    fn["inner" + prop] = function () {
      return this[0] ? this[0]["client" + prop] : undefined;
    };
  }); // @require css/helpers/compute_style.js
  // @require css/helpers/get_suffixed_value.js
  // @require ./helpers/get_extra_space.js

  each(['width', 'height'], function (prop, index) {
    fn[prop] = function (value) {
      if (!this[0]) return value === undefined ? undefined : this;
      if (!arguments.length) return this[0].getBoundingClientRect()[prop] - getExtraSpace(this[0], !index);
      value = parseInt(value, 10);
      return this.each(function (i, ele) {
        var boxSizing = computeStyle(ele, 'boxSizing');
        ele.style[prop] = getSuffixedValue(prop, value + (boxSizing === 'border-box' ? getExtraSpace(ele, !index) : 0));
      });
    };
  }); // @require core/index.js
  // @require css/helpers/compute_style_int.js

  each(['Width', 'Height'], function (prop, index) {
    fn["outer" + prop] = function (includeMargins) {
      if (!this[0]) return;
      return this[0]["offset" + prop] + (includeMargins ? computeStyleInt(this[0], "margin" + (!index ? 'Left' : 'Top')) + computeStyleInt(this[0], "margin" + (!index ? 'Right' : 'Bottom')) : 0);
    };
  }); // @optional ./inner.js
  // @optional ./normal.js
  // @optional ./outer.js
  // @require core/index.js
  // @require data/helpers/get_data.js
  // @require data/helpers/set_data.js

  function addEvent(ele, name, namespaces, callback) {
    callback.guid = callback.guid || guid++;
    var eventCache = getData(ele, eventsNamespace) || setData(ele, eventsNamespace, {});
    eventCache[name] = eventCache[name] || [];
    eventCache[name].push([namespaces, callback]);
    ele.addEventListener(name, callback);
  }

  var returnFalse = function returnFalse() {
    return false;
  },
      returnTrue = function returnTrue() {
    return true;
  };

  function addEventMethods(event) {
    if (event.isDefaultPrevented) return;

    event.isDefaultPrevented = function () {
      return this.defaultPrevented;
    };

    event.isPropagationStopped = returnFalse;
    var stopPropagation = event.stopPropagation;

    event.stopPropagation = function () {
      event.isPropagationStopped = returnTrue;
      return stopPropagation.call(this);
    };

    event.isImmediatePropagationStopped = returnFalse;
    var stopImmediatePropagation = event.stopImmediatePropagation;

    event.stopImmediatePropagation = function () {
      event.isPropagationStopped = returnTrue;
      event.isImmediatePropagationStopped = returnTrue;
      return stopImmediatePropagation.call(this);
    };
  }

  function hasNamespaces(ns1, ns2) {
    for (var i = 0, l = ns2.length; i < l; i++) {
      if (ns1.indexOf(ns2[i]) < 0) return false;
    }

    return true;
  }

  function parseEventName(eventFullName) {
    var parts = eventFullName.split(eventsNamespacesSeparator);
    return [parts[0], parts.slice(1).sort()]; // [name, namespaces]
  } // @require core/index.js


  function removeEventListeners(events, ele, name) {
    each(events[name], function (_ref) {
      var namespaces = _ref[0],
          callback = _ref[1];
      ele.removeEventListener(name, callback);
    });
    delete events[name];
  } // @require core/index.js
  // @require data/helpers/get_data.js
  // @require ./has_namespaces.js
  // @require ./parse_event_name.js
  // @require ./remove_event_listeners.js


  function removeEvent(ele, name, namespaces, callback) {
    var events = getData(ele, eventsNamespace);
    if (!events) return;

    if (!name) {
      if (!namespaces || !namespaces.length) {
        for (name in events) {
          removeEventListeners(events, ele, name);
        }
      } else {
        for (name in events) {
          removeEvent(ele, name, namespaces, callback);
        }
      }
    } else {
      var eventCache = events[name];
      if (!eventCache) return;
      if (callback) callback.guid = callback.guid || guid++;
      events[name] = eventCache.filter(function (_ref2) {
        var ns = _ref2[0],
            cb = _ref2[1];
        if (callback && cb.guid !== callback.guid || !hasNamespaces(ns, namespaces)) return true;
        ele.removeEventListener(name, cb);
      });
    }
  } // @require collection/each.js
  // @require ./helpers/parse_event_name.js
  // @require ./helpers/remove_event.js


  fn.off = function (eventFullName, callback) {
    var _this = this;

    if (eventFullName === undefined) {
      this.each(function (i, ele) {
        return removeEvent(ele);
      });
    } else {
      each(eventFullName.split(eventsSeparatorRe), function (eventFullName) {
        var _parseEventName = parseEventName(eventFullName),
            name = _parseEventName[0],
            namespaces = _parseEventName[1];

        _this.each(function (i, ele) {
          return removeEvent(ele, name, namespaces, callback);
        });
      });
    }

    return this;
  }; // @require collection/each.js
  // @require ./helpers/add_event.js
  // @require ./helpers/add_event_methods.js
  // @require ./helpers/has_namespaces.js
  // @require ./helpers/parse_event_name.js
  // @require ./helpers/remove_event.js


  fn.on = function (eventFullName, selector, callback, _one) {
    var _this2 = this;

    if (!isString(eventFullName)) {
      for (var key in eventFullName) {
        this.on(key, selector, eventFullName[key]);
      }

      return this;
    }

    if (isFunction(selector)) {
      callback = selector;
      selector = null;
    }

    if (eventFullName === 'ready') {
      return this.ready(callback);
    }

    each(eventFullName.split(eventsSeparatorRe), function (eventFullName) {
      var _parseEventName2 = parseEventName(eventFullName),
          name = _parseEventName2[0],
          namespaces = _parseEventName2[1];

      _this2.each(function (i, ele) {
        var finalCallback = function finalCallback(event) {
          if (event.namespace && !hasNamespaces(namespaces, event.namespace.split(eventsNamespacesSeparator))) return;

          if (selector) {
            var target = event.target;

            while (!matches(target, selector)) {
              if (target === ele) return;
              target = target.parentNode;
            }
          }

          event.namespace = event.namespace || '';
          addEventMethods(event);
          callback.call(ele, event, event.data);

          if (_one) {
            removeEvent(ele, name, namespaces, finalCallback);
          }
        };

        finalCallback.guid = callback.guid = callback.guid || guid++;
        addEvent(ele, name, namespaces, finalCallback);
      });
    });
    return this;
  }; // @require ./on.js


  fn.one = function (eventFullName, delegate, callback) {
    return this.on(eventFullName, delegate, callback, true);
  }; // @require core/index.js


  fn.ready = function (callback) {
    if (doc.readyState !== 'loading') {
      setTimeout(callback);
    } else {
      doc.addEventListener('DOMContentLoaded', callback);
    }

    return this;
  }; // @require collection/each.js
  // @require ./helpers/add_event_methods.js
  // @require ./helpers/parse_event_name.js


  fn.trigger = function (eventFullName, data) {
    var evt = eventFullName;

    if (isString(eventFullName)) {
      var _parseEventName3 = parseEventName(eventFullName),
          name = _parseEventName3[0],
          namespaces = _parseEventName3[1];

      evt = doc.createEvent('HTMLEvents');
      evt.initEvent(name, true, false);
      evt.namespace = namespaces.join(eventsNamespacesSeparator);
    }

    evt.data = data;
    addEventMethods(evt);
    return this.each(function (i, ele) {
      ele.dispatchEvent(evt);
    }); //FIXME: Maybe the return value of `dispatchEvent` is actually useful here?
  }; // @optional ./off.js
  // @optional ./on.js
  // @optional ./one.js
  // @optional ./ready.js
  // @optional ./trigger.js


  function getValue(ele) {
    var type = ele.type;
    if (!type) return undefined;

    switch (type.toLowerCase()) {
      case 'select-one':
        return getValueSelectSingle(ele);

      case 'select-multiple':
        return getValueSelectMultiple(ele);

      default:
        return ele.value;
    }
  }

  function getValueSelectMultiple(ele) {
    var values = [];
    each(ele.options, function (option) {
      if (option.selected) {
        values.push(option.value);
      }
    });
    return values;
  }

  function getValueSelectSingle(ele) {
    var selectedIndex = ele.selectedIndex;
    return selectedIndex >= 0 ? ele.options[selectedIndex].value : null;
  } // @require core/index.js


  function queryEncode(prop, value) {
    return "&" + encodeURIComponent(prop) + "=" + encodeURIComponent(value).replace(querySpaceRe, '+');
  } // @require core/index.js
  // @require ./helpers/get_value.js
  // @require ./helpers/query_encode.js


  fn.serialize = function () {
    if (!this[0]) return '';
    var query = '';
    each(this[0].elements || this, function (ele) {
      if (ele.disabled || ele.tagName === 'FIELDSET') return;

      switch (ele.type.toLowerCase()) {
        case 'file':
        case 'reset':
        case 'submit':
        case 'button':
          break;

        case 'radio':
        case 'checkbox':
          if (!ele.checked) break;

        default:
          var value = getValue(ele);

          if (value) {
            var name = ele.name;
            var values = isArray(value) ? value : [value];
            each(values, function (value) {
              query += queryEncode(name, value);
            });
          }

      }
    });
    return query.substr(1);
  }; // @require collection/each.js
  // @require ./helpers/get_value.js


  fn.val = function (value) {
    if (value === undefined) {
      return this[0] ? getValue(this[0]) : undefined;
    } else {
      return this.each(function (i, ele) {
        ele.value = value;
      }); //TODO: Does it work for select[multiple] too?
    }
  }; // @optional ./serialize.js
  // @optional ./val.js
  // @require core/index.js


  fn.clone = function () {
    return this.map(function (i, ele) {
      return ele.cloneNode(true);
    });
  }; // @require collection/each.js


  fn.detach = function () {
    return this.each(function (i, ele) {
      ele.parentNode.removeChild(ele);
    });
  };

  function insertElement(ele, child, prepend) {
    if (prepend) {
      ele.insertBefore(child, ele.childNodes[0]);
    } else {
      ele.appendChild(child);
    }
  } // @require core/index.js
  // @require ./insert_element.js


  function insertContent(parent, child, prepend) {
    var isStr = isString(child);

    if (!isStr && child.length) {
      each(child, function (ele) {
        return insertContent(parent, ele, prepend);
      });
    } else {
      each(parent, isStr ? function (ele) {
        return ele.insertAdjacentHTML(prepend ? 'afterbegin' : 'beforeend', child);
      } : function (ele, index) {
        return insertElement(ele, !index ? child : child.cloneNode(true), prepend);
      });
    }
  } // @require ./helpers/insert_content.js


  fn.append = function (content) {
    insertContent(this, content);
    return this;
  }; // @require ./helpers/insert_content.js


  fn.appendTo = function (parent) {
    insertContent(cash(parent), this);
    return this;
  }; // @require collection/each.js


  fn.html = function (content) {
    if (content === undefined) return this[0] ? this[0].innerHTML : undefined;
    var source = content.nodeType ? content[0].outerHTML : content;
    return this.each(function (i, ele) {
      return ele.innerHTML = source;
    });
  }; // @require ./html.js


  fn.empty = function () {
    return this.html('');
  }; // @require collection/each.js


  fn.insertAfter = function (content) {
    var _this3 = this;

    cash(content).each(function (index, ele) {
      var parent = ele.parentNode,
          sibling = ele.nextSibling;

      _this3.each(function (i, e) {
        parent.insertBefore(!index ? e : e.cloneNode(true), sibling);
      });
    });
    return this;
  }; // @require ./insert_after.js


  fn.after = function (content) {
    cash(content).insertAfter(this);
    return this;
  }; // @require collection/each.js


  fn.insertBefore = function (selector) {
    var _this4 = this;

    cash(selector).each(function (index, ele) {
      var parent = ele.parentNode;

      _this4.each(function (i, e) {
        parent.insertBefore(!index ? e : e.cloneNode(true), ele);
      });
    });
    return this;
  }; // @require ./insert_before.js


  fn.before = function (content) {
    cash(content).insertBefore(this);
    return this;
  }; // @require ./helpers/insert_content.js


  fn.prepend = function (content) {
    insertContent(this, content, true);
    return this;
  }; // @require ./helpers/insert_content.js


  fn.prependTo = function (parent) {
    insertContent(cash(parent), this, true);
    return this;
  }; // @require events/off.js
  // @require ./detach.js


  fn.remove = function () {
    return this.detach().off();
  }; // @require collection/each.js
  // @require ./after.js
  // @require ./remove.js


  fn.replaceWith = function (content) {
    var _this5 = this;

    return this.each(function (i, ele) {
      var parent = ele.parentNode;
      if (!parent) return;
      var $eles = cash(content);

      if (!$eles[0]) {
        _this5.remove();

        return false;
      }

      parent.replaceChild($eles[0], ele);
      cash($eles[0]).after($eles.slice(1));
    });
  }; // @require ./replace_with.js


  fn.replaceAll = function (content) {
    cash(content).replaceWith(this);
    return this;
  }; // @require collection/each.js


  fn.text = function (content) {
    if (content === undefined) return this[0] ? this[0].textContent : '';
    return this.each(function (i, ele) {
      ele.textContent = content;
    });
  }; // @optional ./after.js
  // @optional ./append.js
  // @optional ./append_to.js
  // @optional ./before.js
  // @optional ./clone.js
  // @optional ./detach.js
  // @optional ./empty.js
  // @optional ./html.js
  // @optional ./insert_after.js
  // @optional ./insert_before.js
  // @optional ./prepend.js
  // @optional ./prepend_to.js
  // @optional ./remove.js
  // @optional ./replace_all.js
  // @optional ./replace_with.js
  // @optional ./text.js
  // @require core/index.js


  fn.offset = function () {
    var ele = this[0];
    if (!ele) return;
    var rect = ele.getBoundingClientRect();
    return {
      top: rect.top + win.pageYOffset - docEl.clientTop,
      left: rect.left + win.pageXOffset - docEl.clientLeft
    };
  }; // @require core/index.js


  fn.offsetParent = function () {
    return cash(this[0] ? this[0].offsetParent : undefined);
  }; // @require core/index.js


  fn.position = function () {
    var ele = this[0];
    if (!ele) return;
    return {
      left: ele.offsetLeft,
      top: ele.offsetTop
    };
  }; // @optional ./offset.js
  // @optional ./offset_parent.js
  // @optional ./position.js
  // @require collection/each.js
  // @require collection/filter.js


  fn.children = function (selector) {
    var result = [];
    this.each(function (i, ele) {
      push.apply(result, ele.children);
    });
    result = cash(unique(result));
    if (!selector) return result;
    return result.filter(function (i, ele) {
      return matches(ele, selector);
    });
  }; // @require collection/filter.js


  fn.has = function (selector) {
    var comparator = isString(selector) ? function (i, ele) {
      return !!find(selector, ele).length;
    } : function (i, ele) {
      return ele.contains(selector);
    };
    return this.filter(comparator);
  }; // @require collection/each.js
  // @require ./has.js


  fn.find = function (selector) {
    if (!selector || selector.nodeType) {
      return cash(selector && this.has(selector).length ? selector : null);
    }

    var result = [];
    this.each(function (i, ele) {
      push.apply(result, find(selector, ele));
    });
    return cash(unique(result));
  }; // @require collection/each.js


  fn.is = function (selector) {
    if (!selector || !this[0]) return false;
    var comparator = getCompareFunction(selector);
    var match = false;
    this.each(function (i, ele) {
      match = comparator(i, ele, selector);
      return !match;
    });
    return match;
  }; // @require core/index.js


  fn.next = function () {
    return cash(this[0] ? this[0].nextElementSibling : undefined);
  }; // @require collection/filter.js


  fn.not = function (selector) {
    if (!selector || !this[0]) return this;
    var comparator = getCompareFunction(selector);
    return this.filter(function (i, ele) {
      return !comparator(i, ele, selector);
    });
  }; // @require collection/each.js


  fn.parent = function () {
    var result = [];
    this.each(function (i, ele) {
      if (ele && ele.parentNode) {
        result.push(ele.parentNode);
      }
    });
    return cash(unique(result));
  }; // @require traversal/children.js
  // @require traversal/parent.js
  // @require ./get.js
  //FIXME Ugly file name, is there a better option?


  fn.index = function (ele) {
    var child = ele ? cash(ele)[0] : this[0],
        collection = ele ? this : cash(child).parent().children();
    return collection.get().indexOf(child);
  }; // @optional ./add.js
  // @optional ./each.js
  // @optional ./eq.js
  // @optional ./filter.js
  // @optional ./first.js
  // @optional ./get.js
  // @optional ./indexFn.js
  // @optional ./last.js
  // @optional ./map.js
  // @optional ./slice.js
  // @require collection/filter.js
  // @require ./is.js
  // @require ./parent.js


  fn.closest = function (selector) {
    if (!selector || !this[0]) return cash();
    if (this.is(selector)) return this.filter(selector);
    return this.parent().closest(selector);
  }; // @require collection/each.js


  fn.parents = function (selector) {
    var result = [];
    var last;
    this.each(function (i, ele) {
      last = ele;

      while (last && last.parentNode && last !== doc.body.parentNode) {
        last = last.parentNode;

        if (!selector || selector && matches(last, selector)) {
          result.push(last);
        }
      }
    });
    return cash(unique(result));
  }; // @require core/index.js


  fn.prev = function () {
    return cash(this[0] ? this[0].previousElementSibling : undefined);
  }; // @require collection/filter.js
  // @require ./children.js
  // @require ./parent.js


  fn.siblings = function () {
    var ele = this[0];
    return this.parent().children().filter(function (i, child) {
      return child !== ele;
    });
  }; // @optional ./children.js
  // @optional ./closest.js
  // @optional ./find.js
  // @optional ./has.js
  // @optional ./is.js
  // @optional ./next.js
  // @optional ./not.js
  // @optional ./parent.js
  // @optional ./parents.js
  // @optional ./prev.js
  // @optional ./siblings.js


  window.cash = window.$ = cash;
})();