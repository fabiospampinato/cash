/* MIT https://github.com/fabiospampinato/cash */
const propMap = {
    /* GENERAL */
    class: 'className',
    contenteditable: 'contentEditable',
    /* LABEL */
    for: 'htmlFor',
    /* INPUT */
    readonly: 'readOnly',
    maxlength: 'maxLength',
    tabindex: 'tabIndex',
    /* TABLE */
    colspan: 'colSpan',
    rowspan: 'rowSpan',
    /* IMAGE */
    usemap: 'useMap'
};
function attempt(fn, arg) {
    try {
        return fn(arg);
    }
    catch (_a) {
        return arg;
    }
}
const doc = document, win = window, docEle = doc.documentElement, createElement = doc.createElement.bind(doc), div = createElement('div'), table = createElement('table'), tbody = createElement('tbody'), tr = createElement('tr'), { isArray, prototype: ArrayPrototype } = Array, { concat, filter, indexOf, map, push, slice, some, splice } = ArrayPrototype;
const idRe = /^#(?:[\w-]|\\.|[^\x00-\xa0])*$/, classRe = /^\.(?:[\w-]|\\.|[^\x00-\xa0])*$/, htmlRe = /<.+>/, tagRe = /^\w+$/;
// @require ./variables.ts
function find(selector, context) {
    const isFragment = isDocumentFragment(context);
    return !selector || (!isFragment && !isDocument(context) && !isElement(context))
        ? []
        : !isFragment && classRe.test(selector)
            ? context.getElementsByClassName(selector.slice(1))
            : !isFragment && tagRe.test(selector)
                ? context.getElementsByTagName(selector)
                : context.querySelectorAll(selector);
}
// @require ./find.ts
// @require ./variables.ts
class Cash {
    constructor(selector, context) {
        if (!selector)
            return;
        if (isCash(selector))
            return selector;
        let eles = selector;
        if (isString(selector)) {
            const ctx = (isCash(context) ? context[0] : context) || doc;
            eles = idRe.test(selector) && 'getElementById' in ctx
                ? ctx.getElementById(selector.slice(1))
                : htmlRe.test(selector)
                    ? parseHTML(selector)
                    : find(selector, ctx);
            if (!eles)
                return;
        }
        else if (isFunction(selector)) {
            return this.ready(selector); //FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality
        }
        if (eles.nodeType || eles === win)
            eles = [eles];
        this.length = eles.length;
        for (let i = 0, l = this.length; i < l; i++) {
            this[i] = eles[i];
        }
    }
    init(selector, context) {
        return new Cash(selector, context);
    }
}
const fn = Cash.prototype, cash = fn.init;
cash.fn = cash.prototype = fn; // Ensuring that `cash () instanceof cash`
fn.length = 0;
fn.splice = splice; // Ensuring a cash collection gets printed as array-like in Chrome's devtools
if (typeof Symbol === 'function') { // Ensuring a cash collection is iterable
    fn[Symbol['iterator']] = ArrayPrototype[Symbol['iterator']];
}
fn.map = function (callback) {
    return cash(concat.apply([], map.call(this, (ele, i) => callback.call(ele, i, ele))));
};
fn.slice = function (start, end) {
    return cash(slice.call(this, start, end));
};
// @require ./cash.ts
const dashAlphaRe = /-([a-z])/g;
function camelCase(str) {
    return str.replace(dashAlphaRe, (match, letter) => letter.toUpperCase());
}
cash.guid = 1;
// @require ./cash.ts
function matches(ele, selector) {
    const matches = ele && (ele['matches'] || ele['webkitMatchesSelector'] || ele['msMatchesSelector']);
    return !!matches && !!selector && matches.call(ele, selector);
}
function isCash(x) {
    return x instanceof Cash;
}
function isWindow(x) {
    return !!x && x === x.window;
}
function isDocument(x) {
    return !!x && x.nodeType === 9;
}
function isDocumentFragment(x) {
    return !!x && x.nodeType === 11;
}
function isElement(x) {
    return !!x && x.nodeType === 1;
}
function isBoolean(x) {
    return typeof x === 'boolean';
}
function isFunction(x) {
    return typeof x === 'function';
}
function isString(x) {
    return typeof x === 'string';
}
function isUndefined(x) {
    return x === undefined;
}
function isNull(x) {
    return x === null;
}
function isNumeric(x) {
    return !isNaN(parseFloat(x)) && isFinite(x);
}
function isPlainObject(x) {
    if (typeof x !== 'object' || x === null)
        return false;
    const proto = Object.getPrototypeOf(x);
    return proto === null || proto === Object.prototype;
}
cash.isWindow = isWindow;
cash.isFunction = isFunction;
cash.isArray = isArray;
cash.isNumeric = isNumeric;
cash.isPlainObject = isPlainObject;
fn.get = function (index) {
    if (isUndefined(index))
        return slice.call(this);
    index = Number(index);
    return this[index < 0 ? index + this.length : index];
};
fn.eq = function (index) {
    return cash(this.get(index));
};
fn.first = function () {
    return this.eq(0);
};
fn.last = function () {
    return this.eq(-1);
};
function each(arr, callback, _reverse) {
    if (_reverse) {
        let i = arr.length;
        while (i--) {
            if (callback.call(arr[i], i, arr[i]) === false)
                return arr;
        }
    }
    else if (isPlainObject(arr)) {
        const keys = Object.keys(arr);
        for (let i = 0, l = keys.length; i < l; i++) {
            const key = keys[i];
            if (callback.call(arr[key], key, arr[key]) === false)
                return arr;
        }
    }
    else {
        for (let i = 0, l = arr.length; i < l; i++) {
            if (callback.call(arr[i], i, arr[i]) === false)
                return arr;
        }
    }
    return arr;
}
cash.each = each;
fn.each = function (callback) {
    return each(this, callback);
};
fn.prop = function (prop, value) {
    if (!prop)
        return;
    if (isString(prop)) {
        prop = propMap[prop] || prop;
        if (arguments.length < 2)
            return this[0] && this[0][prop];
        return this.each((i, ele) => { ele[prop] = value; });
    }
    for (const key in prop) {
        this.prop(key, prop[key]);
    }
    return this;
};
fn.removeProp = function (prop) {
    return this.each((i, ele) => { delete ele[propMap[prop] || prop]; });
};
function extend(...sources) {
    const deep = isBoolean(sources[0]) ? sources.shift() : false, target = sources.shift(), length = sources.length;
    if (!target)
        return {};
    if (!length)
        return extend(deep, cash, target);
    for (let i = 0; i < length; i++) {
        const source = sources[i];
        for (const key in source) {
            if (deep && (isArray(source[key]) || isPlainObject(source[key]))) {
                if (!target[key] || target[key].constructor !== source[key].constructor)
                    target[key] = new source[key].constructor();
                extend(deep, target[key], source[key]);
            }
            else {
                target[key] = source[key];
            }
        }
    }
    return target;
}
cash.extend = extend;
fn.extend = function (plugins) {
    return extend(fn, plugins);
};
// @require ./matches.ts
// @require ./type_checking.ts
function getCompareFunction(comparator) {
    return isString(comparator)
        ? (i, ele) => matches(ele, comparator)
        : isFunction(comparator)
            ? comparator
            : isCash(comparator)
                ? (i, ele) => comparator.is(ele)
                : !comparator
                    ? () => false
                    : (i, ele) => ele === comparator;
}
fn.filter = function (comparator) {
    const compare = getCompareFunction(comparator);
    return cash(filter.call(this, (ele, i) => compare.call(ele, i, ele)));
};
// @require collection/filter.ts
function filtered(collection, comparator) {
    return !comparator ? collection : collection.filter(comparator);
}
// @require ./type_checking.ts
const splitValuesRe = /\S+/g;
function getSplitValues(str) {
    return isString(str) ? str.match(splitValuesRe) || [] : [];
}
fn.hasClass = function (cls) {
    return !!cls && some.call(this, (ele) => isElement(ele) && ele.classList.contains(cls));
};
fn.removeAttr = function (attr) {
    const attrs = getSplitValues(attr);
    return this.each((i, ele) => {
        if (!isElement(ele))
            return;
        each(attrs, (i, a) => {
            ele.removeAttribute(a);
        });
    });
};
function attr(attr, value) {
    if (!attr)
        return;
    if (isString(attr)) {
        if (arguments.length < 2) {
            if (!this[0] || !isElement(this[0]))
                return;
            const value = this[0].getAttribute(attr);
            return isNull(value) ? undefined : value;
        }
        if (isUndefined(value))
            return this;
        if (isNull(value))
            return this.removeAttr(attr);
        return this.each((i, ele) => {
            if (!isElement(ele))
                return;
            ele.setAttribute(attr, value);
        });
    }
    for (const key in attr) {
        this.attr(key, attr[key]);
    }
    return this;
}
fn.attr = attr;
fn.toggleClass = function (cls, force) {
    const classes = getSplitValues(cls), isForce = !isUndefined(force);
    return this.each((i, ele) => {
        if (!isElement(ele))
            return;
        each(classes, (i, c) => {
            if (isForce) {
                force ? ele.classList.add(c) : ele.classList.remove(c);
            }
            else {
                ele.classList.toggle(c);
            }
        });
    });
};
fn.addClass = function (cls) {
    return this.toggleClass(cls, true);
};
fn.removeClass = function (cls) {
    if (arguments.length)
        return this.toggleClass(cls, false);
    return this.attr('class', '');
};
function pluck(arr, prop, deep, until) {
    const plucked = [], isCallback = isFunction(prop), compare = until && getCompareFunction(until);
    for (let i = 0, l = arr.length; i < l; i++) {
        if (isCallback) {
            const val = prop(arr[i]);
            if (val.length)
                push.apply(plucked, val);
        }
        else {
            let val = arr[i][prop];
            while (val != null) {
                if (until && compare(-1, val))
                    break;
                plucked.push(val);
                val = deep ? val[prop] : null;
            }
        }
    }
    return plucked;
}
function unique(arr) {
    return arr.length > 1 ? filter.call(arr, (item, index, self) => indexOf.call(self, item) === index) : arr;
}
cash.unique = unique;
fn.add = function (selector, context) {
    return cash(unique(this.get().concat(cash(selector, context).get())));
};
// @require core/type_checking.ts
// @require core/variables.ts
function computeStyle(ele, prop, isVariable) {
    if (!isElement(ele))
        return;
    const style = win.getComputedStyle(ele, null);
    return isVariable ? style.getPropertyValue(prop) || undefined : style[prop] || ele.style[prop];
}
// @require ./compute_style.ts
function computeStyleInt(ele, prop) {
    return parseInt(computeStyle(ele, prop), 10) || 0;
}
const cssVariableRe = /^--/;
// @require ./variables.ts
function isCSSVariable(prop) {
    return cssVariableRe.test(prop);
}
// @require core/camel_case.ts
// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts
// @require ./is_css_variable.ts
const prefixedProps = {}, { style } = div, vendorsPrefixes = ['webkit', 'moz', 'ms'];
function getPrefixedProp(prop, isVariable = isCSSVariable(prop)) {
    if (isVariable)
        return prop;
    if (!prefixedProps[prop]) {
        const propCC = camelCase(prop), propUC = `${propCC[0].toUpperCase()}${propCC.slice(1)}`, props = (`${propCC} ${vendorsPrefixes.join(`${propUC} `)}${propUC}`).split(' ');
        each(props, (i, p) => {
            if (p in style) {
                prefixedProps[prop] = p;
                return false;
            }
        });
    }
    return prefixedProps[prop];
}
;
// @require core/type_checking.ts
// @require ./is_css_variable.ts
const numericProps = {
    animationIterationCount: true,
    columnCount: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    gridArea: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnStart: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowStart: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    widows: true,
    zIndex: true
};
function getSuffixedValue(prop, value, isVariable = isCSSVariable(prop)) {
    return !isVariable && !numericProps[prop] && isNumeric(value) ? `${value}px` : value;
}
function css(prop, value) {
    if (isString(prop)) {
        const isVariable = isCSSVariable(prop);
        prop = getPrefixedProp(prop, isVariable);
        if (arguments.length < 2)
            return this[0] && computeStyle(this[0], prop, isVariable);
        if (!prop)
            return this;
        value = getSuffixedValue(prop, value, isVariable);
        return this.each((i, ele) => {
            if (!isElement(ele))
                return;
            if (isVariable) {
                ele.style.setProperty(prop, value);
            }
            else {
                ele.style[prop] = value;
            }
        });
    }
    for (const key in prop) {
        this.css(key, prop[key]);
    }
    return this;
}
;
fn.css = css;
// @optional ./css.ts
// @require core/attempt.ts
// @require core/camel_case.ts
const JSONStringRe = /^\s+|\s+$/;
function getData(ele, key) {
    const value = ele.dataset[key] || ele.dataset[camelCase(key)];
    if (JSONStringRe.test(value))
        return value;
    return attempt(JSON.parse, value);
}
// @require core/attempt.ts
// @require core/camel_case.ts
function setData(ele, key, value) {
    value = attempt(JSON.stringify, value);
    ele.dataset[camelCase(key)] = value;
}
function data(name, value) {
    if (!name) {
        if (!this[0])
            return;
        const datas = {};
        for (const key in this[0].dataset) {
            datas[key] = getData(this[0], key);
        }
        return datas;
    }
    if (isString(name)) {
        if (arguments.length < 2)
            return this[0] && getData(this[0], name);
        if (isUndefined(value))
            return this;
        return this.each((i, ele) => { setData(ele, name, value); });
    }
    for (const key in name) {
        this.data(key, name[key]);
    }
    return this;
}
fn.data = data;
// @optional ./data.ts
function getDocumentDimension(doc, dimension) {
    const docEle = doc.documentElement;
    return Math.max(doc.body[`scroll${dimension}`], docEle[`scroll${dimension}`], doc.body[`offset${dimension}`], docEle[`offset${dimension}`], docEle[`client${dimension}`]);
}
// @require css/helpers/compute_style_int.ts
function getExtraSpace(ele, xAxis) {
    return computeStyleInt(ele, `border${xAxis ? 'Left' : 'Top'}Width`) + computeStyleInt(ele, `padding${xAxis ? 'Left' : 'Top'}`) + computeStyleInt(ele, `padding${xAxis ? 'Right' : 'Bottom'}`) + computeStyleInt(ele, `border${xAxis ? 'Right' : 'Bottom'}Width`);
}
each([true, false], (i, outer) => {
    each(['Width', 'Height'], (i, prop) => {
        const name = `${outer ? 'outer' : 'inner'}${prop}`;
        fn[name] = function (includeMargins) {
            if (!this[0])
                return;
            if (isWindow(this[0]))
                return outer ? this[0][`inner${prop}`] : this[0].document.documentElement[`client${prop}`];
            if (isDocument(this[0]))
                return getDocumentDimension(this[0], prop);
            return this[0][`${outer ? 'offset' : 'client'}${prop}`] + (includeMargins && outer ? computeStyleInt(this[0], `margin${i ? 'Top' : 'Left'}`) + computeStyleInt(this[0], `margin${i ? 'Bottom' : 'Right'}`) : 0);
        };
    });
});
each(['Width', 'Height'], (index, prop) => {
    const propLC = prop.toLowerCase();
    fn[propLC] = function (value) {
        if (!this[0])
            return isUndefined(value) ? undefined : this;
        if (!arguments.length) {
            if (isWindow(this[0]))
                return this[0].document.documentElement[`client${prop}`];
            if (isDocument(this[0]))
                return getDocumentDimension(this[0], prop);
            return this[0].getBoundingClientRect()[propLC] - getExtraSpace(this[0], !index);
        }
        const valueNumber = parseInt(value, 10);
        return this.each((i, ele) => {
            if (!isElement(ele))
                return;
            const boxSizing = computeStyle(ele, 'boxSizing');
            ele.style[propLC] = getSuffixedValue(propLC, valueNumber + (boxSizing === 'border-box' ? getExtraSpace(ele, !index) : 0));
        });
    };
});
// @optional ./inner_outer.ts
// @optional ./normal.ts
// @require css/helpers/compute_style.ts
const defaultDisplay = {};
function getDefaultDisplay(tagName) {
    if (defaultDisplay[tagName])
        return defaultDisplay[tagName];
    const ele = createElement(tagName);
    doc.body.insertBefore(ele, null);
    const display = computeStyle(ele, 'display');
    doc.body.removeChild(ele);
    return defaultDisplay[tagName] = display !== 'none' ? display : 'block';
}
// @require css/helpers/compute_style.ts
function isHidden(ele) {
    return computeStyle(ele, 'display') === 'none';
}
const displayProperty = '___cd';
fn.toggle = function (force) {
    return this.each((i, ele) => {
        if (!isElement(ele))
            return;
        const show = isUndefined(force) ? isHidden(ele) : force;
        if (show) {
            ele.style.display = ele[displayProperty] || '';
            if (isHidden(ele)) {
                ele.style.display = getDefaultDisplay(ele.tagName);
            }
        }
        else {
            ele[displayProperty] = computeStyle(ele, 'display');
            ele.style.display = 'none';
        }
    });
};
fn.hide = function () {
    return this.toggle(false);
};
fn.show = function () {
    return this.toggle(true);
};
// @optional ./hide.ts
// @optional ./show.ts
// @optional ./toggle.ts
function hasNamespaces(ns1, ns2) {
    return !ns2 || !some.call(ns2, (ns) => ns1.indexOf(ns) < 0);
}
const eventsNamespace = '___ce', eventsNamespacesSeparator = '.', eventsFocus = { focus: 'focusin', blur: 'focusout' }, eventsHover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }, eventsMouseRe = /^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;
// @require ./variables.ts
function getEventNameBubbling(name) {
    return eventsHover[name] || eventsFocus[name] || name;
}
// @require ./variables.ts
function getEventsCache(ele) {
    return ele[eventsNamespace] = (ele[eventsNamespace] || {});
}
// @require core/guid.ts
// @require events/helpers/get_events_cache.ts
function addEvent(ele, name, namespaces, selector, callback) {
    const eventCache = getEventsCache(ele);
    eventCache[name] = (eventCache[name] || []);
    eventCache[name].push([namespaces, selector, callback]);
    ele.addEventListener(name, callback);
}
// @require ./variables.ts
function parseEventName(eventName) {
    const parts = eventName.split(eventsNamespacesSeparator);
    return [parts[0], parts.slice(1).sort()]; // [name, namespace[]]
}
// @require ./get_events_cache.ts
// @require ./has_namespaces.ts
// @require ./parse_event_name.ts
function removeEvent(ele, name, namespaces, selector, callback) {
    const cache = getEventsCache(ele);
    if (!name) {
        for (name in cache) {
            removeEvent(ele, name, namespaces, selector, callback);
        }
    }
    else if (cache[name]) {
        cache[name] = cache[name].filter(([ns, sel, cb]) => {
            if ((callback && cb.guid !== callback.guid) || !hasNamespaces(ns, namespaces) || (selector && selector !== sel))
                return true;
            ele.removeEventListener(name, cb);
        });
    }
}
fn.off = function (eventFullName, selector, callback) {
    if (isUndefined(eventFullName)) {
        this.each((i, ele) => {
            if (!isElement(ele) && !isDocument(ele) && !isWindow(ele))
                return;
            removeEvent(ele);
        });
    }
    else if (!isString(eventFullName)) {
        for (const key in eventFullName) {
            this.off(key, eventFullName[key]);
        }
    }
    else {
        if (isFunction(selector)) {
            callback = selector;
            selector = '';
        }
        each(getSplitValues(eventFullName), (i, eventFullName) => {
            const [nameOriginal, namespaces] = parseEventName(eventFullName), name = getEventNameBubbling(nameOriginal);
            this.each((i, ele) => {
                if (!isElement(ele) && !isDocument(ele) && !isWindow(ele))
                    return;
                removeEvent(ele, name, namespaces, selector, callback);
            });
        });
    }
    return this;
};
function on(eventFullName, selector, data, callback, _one) {
    if (!isString(eventFullName)) {
        for (const key in eventFullName) {
            this.on(key, selector, data, eventFullName[key], _one);
        }
        return this;
    }
    if (!isString(selector)) {
        if (isUndefined(selector) || isNull(selector)) {
            selector = '';
        }
        else if (isUndefined(data)) {
            data = selector;
            selector = '';
        }
        else {
            callback = data;
            data = selector;
            selector = '';
        }
    }
    if (!isFunction(callback)) {
        callback = data;
        data = undefined;
    }
    if (!callback)
        return this;
    each(getSplitValues(eventFullName), (i, eventFullName) => {
        const [nameOriginal, namespaces] = parseEventName(eventFullName), name = getEventNameBubbling(nameOriginal), isEventHover = (nameOriginal in eventsHover), isEventFocus = (nameOriginal in eventsFocus);
        if (!name)
            return;
        this.each((i, ele) => {
            if (!isElement(ele) && !isDocument(ele) && !isWindow(ele))
                return;
            const finalCallback = function (event) {
                if (event.target[`___i${event.type}`])
                    return event.stopImmediatePropagation(); // Ignoring native event in favor of the upcoming custom one
                if (event.namespace && !hasNamespaces(namespaces, event.namespace.split(eventsNamespacesSeparator)))
                    return;
                if (!selector && ((isEventFocus && (event.target !== ele || event.___ot === name)) || (isEventHover && event.relatedTarget && ele.contains(event.relatedTarget))))
                    return;
                let thisArg = ele;
                if (selector) {
                    let target = event.target;
                    while (!matches(target, selector)) {
                        if (target === ele)
                            return;
                        target = target.parentNode;
                        if (!target)
                            return;
                    }
                    thisArg = target;
                }
                Object.defineProperty(event, 'currentTarget', {
                    configurable: true,
                    get() {
                        return thisArg;
                    }
                });
                Object.defineProperty(event, 'delegateTarget', {
                    configurable: true,
                    get() {
                        return ele;
                    }
                });
                Object.defineProperty(event, 'data', {
                    configurable: true,
                    get() {
                        return data;
                    }
                });
                const returnValue = callback.call(thisArg, event, event.___td);
                if (_one) {
                    removeEvent(ele, name, namespaces, selector, finalCallback);
                }
                if (returnValue === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            };
            finalCallback.guid = callback.guid = (callback.guid || cash.guid++);
            addEvent(ele, name, namespaces, selector, finalCallback);
        });
    });
    return this;
}
fn.on = on;
function one(eventFullName, selector, data, callback) {
    return this.on(eventFullName, selector, data, callback, true);
}
;
fn.one = one;
fn.ready = function (callback) {
    const cb = () => setTimeout(callback, 0, cash);
    if (doc.readyState !== 'loading') {
        cb();
    }
    else {
        doc.addEventListener('DOMContentLoaded', cb);
    }
    return this;
};
fn.trigger = function (event, data) {
    if (isString(event)) {
        const [nameOriginal, namespaces] = parseEventName(event), name = getEventNameBubbling(nameOriginal);
        if (!name)
            return this;
        const type = eventsMouseRe.test(name) ? 'MouseEvents' : 'HTMLEvents';
        event = doc.createEvent(type);
        event.initEvent(name, true, true);
        event.namespace = namespaces.join(eventsNamespacesSeparator);
        event.___ot = nameOriginal;
    }
    event.___td = data;
    const isEventFocus = (event.___ot in eventsFocus);
    return this.each((i, ele) => {
        if (isEventFocus && isFunction(ele[event.___ot])) {
            ele[`___i${event.type}`] = true; // Ensuring the native event is ignored
            ele[event.___ot]();
            ele[`___i${event.type}`] = false; // Ensuring the custom event is not ignored
        }
        ele.dispatchEvent(event);
    });
};
// @optional ./off.ts
// @optional ./on.ts
// @optional ./one.ts
// @optional ./ready.ts
// @optional ./trigger.ts
// @require core/pluck.ts
// @require core/variables.ts
function getValue(ele) {
    if (ele.multiple && ele.options)
        return pluck(filter.call(ele.options, option => option.selected && !option.disabled && !option.parentNode.disabled), 'value');
    return ele.value || '';
}
const queryEncodeSpaceRe = /%20/g, queryEncodeCRLFRe = /\r?\n/g;
function queryEncode(prop, value) {
    return `&${encodeURIComponent(prop)}=${encodeURIComponent(value.replace(queryEncodeCRLFRe, '\r\n')).replace(queryEncodeSpaceRe, '+')}`;
}
const skippableRe = /file|reset|submit|button|image/i, checkableRe = /radio|checkbox/i;
fn.serialize = function () {
    let query = '';
    this.each((i, ele) => {
        each(ele.elements || [ele], (i, ele) => {
            if (ele.disabled || !ele.name || ele.tagName === 'FIELDSET' || skippableRe.test(ele.type) || (checkableRe.test(ele.type) && !ele.checked))
                return;
            const value = getValue(ele);
            if (!isUndefined(value)) {
                const values = isArray(value) ? value : [value];
                each(values, (i, value) => {
                    query += queryEncode(ele.name, value);
                });
            }
        });
    });
    return query.slice(1);
};
function val(value) {
    if (!arguments.length)
        return this[0] && getValue(this[0]);
    return this.each((i, ele) => {
        const isSelect = ele.multiple && ele.options;
        if (isSelect || checkableRe.test(ele.type)) {
            const eleValue = isArray(value) ? map.call(value, String) : (isNull(value) ? [] : [String(value)]);
            if (isSelect) {
                each(ele.options, (i, option) => {
                    option.selected = eleValue.indexOf(option.value) >= 0;
                }, true);
            }
            else {
                ele.checked = eleValue.indexOf(ele.value) >= 0;
            }
        }
        else {
            ele.value = isUndefined(value) || isNull(value) ? '' : value;
        }
    });
}
fn.val = val;
fn.clone = function () {
    return this.map((i, ele) => ele.cloneNode(true));
};
fn.detach = function (comparator) {
    filtered(this, comparator).each((i, ele) => {
        if (ele.parentNode) {
            ele.parentNode.removeChild(ele);
        }
    });
    return this;
};
const fragmentRe = /^\s*<(\w+)[^>]*>/, singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
const containers = {
    '*': div,
    tr: tbody,
    td: tr,
    th: tr,
    thead: table,
    tbody: table,
    tfoot: table
};
//TODO: Create elements inside a document fragment, in order to prevent inline event handlers from firing
//TODO: Ensure the created elements have the fragment as their parent instead of null, this also ensures we can deal with detatched nodes more reliably
function parseHTML(html) {
    if (!isString(html))
        return [];
    if (singleTagRe.test(html))
        return [createElement(RegExp.$1)];
    const fragment = fragmentRe.test(html) && RegExp.$1, container = containers[fragment] || containers['*'];
    container.innerHTML = html;
    return cash(container.childNodes).detach().get();
}
cash.parseHTML = parseHTML;
fn.empty = function () {
    return this.each((i, ele) => {
        while (ele.firstChild) {
            ele.removeChild(ele.firstChild);
        }
    });
};
function html(html) {
    if (!arguments.length)
        return this[0] && this[0].innerHTML;
    if (isUndefined(html))
        return this;
    return this.each((i, ele) => {
        if (!isElement(ele))
            return;
        ele.innerHTML = html;
    });
}
fn.html = html;
fn.remove = function (comparator) {
    filtered(this, comparator).detach().off();
    return this;
};
function text(text) {
    if (isUndefined(text))
        return this[0] ? this[0].textContent : '';
    return this.each((i, ele) => {
        if (!isElement(ele))
            return;
        ele.textContent = text;
    });
}
;
fn.text = text;
fn.unwrap = function () {
    this.parent().each((i, ele) => {
        if (ele.tagName === 'BODY')
            return;
        const $ele = cash(ele);
        $ele.replaceWith($ele.children());
    });
    return this;
};
fn.offset = function () {
    const ele = this[0];
    if (!ele)
        return;
    const rect = ele.getBoundingClientRect();
    return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
    };
};
fn.offsetParent = function () {
    return this.map((i, ele) => {
        let offsetParent = ele.offsetParent;
        while (offsetParent && computeStyle(offsetParent, 'position') === 'static') {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || docEle;
    });
};
fn.position = function () {
    const ele = this[0];
    if (!ele)
        return;
    const isFixed = (computeStyle(ele, 'position') === 'fixed'), offset = isFixed ? ele.getBoundingClientRect() : this.offset();
    if (!isFixed) {
        const doc = ele.ownerDocument;
        let offsetParent = ele.offsetParent || doc.documentElement;
        while ((offsetParent === doc.body || offsetParent === doc.documentElement) && computeStyle(offsetParent, 'position') === 'static') {
            offsetParent = offsetParent.parentNode;
        }
        if (offsetParent !== ele && isElement(offsetParent)) {
            const parentOffset = cash(offsetParent).offset();
            offset.top -= parentOffset.top + computeStyleInt(offsetParent, 'borderTopWidth');
            offset.left -= parentOffset.left + computeStyleInt(offsetParent, 'borderLeftWidth');
        }
    }
    return {
        top: offset.top - computeStyleInt(ele, 'marginTop'),
        left: offset.left - computeStyleInt(ele, 'marginLeft')
    };
};
fn.children = function (comparator) {
    return filtered(cash(unique(pluck(this, ele => ele.children))), comparator);
};
fn.contents = function () {
    return cash(unique(pluck(this, ele => ele.tagName === 'IFRAME' ? [ele.contentDocument] : (ele.tagName === 'TEMPLATE' ? ele.content.childNodes : ele.childNodes))));
};
fn.find = function (selector) {
    return cash(unique(pluck(this, ele => find(selector, ele))));
};
// @require core/variables.ts
// @require collection/filter.ts
// @require traversal/find.ts
const HTMLCDATARe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, scriptTypeRe = /^$|^module$|\/(java|ecma)script/i, scriptAttributes = ['type', 'src', 'nonce', 'noModule'];
function evalScripts(node, doc) {
    const collection = cash(node);
    collection.filter('script').add(collection.find('script')).each((i, ele) => {
        if (scriptTypeRe.test(ele.type) && docEle.contains(ele)) { // The script type is supported // The element is attached to the DOM // Using `documentElement` for broader browser support
            const script = createElement('script');
            script.text = ele.textContent.replace(HTMLCDATARe, '');
            each(scriptAttributes, (i, attr) => {
                if (ele[attr])
                    script[attr] = ele[attr];
            });
            doc.head.insertBefore(script, null);
            doc.head.removeChild(script);
        }
    });
}
// @require ./eval_scripts.ts
function insertElement(anchor, target, left, inside, evaluate) {
    if (inside) { // prepend/append
        anchor.insertBefore(target, left ? anchor.firstChild : null);
    }
    else { // before/after
        if (anchor.nodeName === 'HTML') {
            anchor.parentNode.replaceChild(target, anchor);
        }
        else {
            anchor.parentNode.insertBefore(target, left ? anchor : anchor.nextSibling);
        }
    }
    if (evaluate) {
        evalScripts(target, anchor.ownerDocument);
    }
}
// @require ./insert_element.ts
function insertSelectors(selectors, anchors, inverse, left, inside, reverseLoop1, reverseLoop2, reverseLoop3) {
    each(selectors, (si, selector) => {
        each(cash(selector), (ti, target) => {
            each(cash(anchors), (ai, anchor) => {
                const anchorFinal = inverse ? target : anchor, targetFinal = inverse ? anchor : target, indexFinal = inverse ? ti : ai;
                insertElement(anchorFinal, !indexFinal ? targetFinal : targetFinal.cloneNode(true), left, inside, !indexFinal);
            }, reverseLoop3);
        }, reverseLoop2);
    }, reverseLoop1);
    return anchors;
}
fn.after = function () {
    return insertSelectors(arguments, this, false, false, false, true, true);
};
fn.append = function () {
    return insertSelectors(arguments, this, false, false, true);
};
fn.appendTo = function (selector) {
    return insertSelectors(arguments, this, true, false, true);
};
fn.before = function () {
    return insertSelectors(arguments, this, false, true);
};
fn.insertAfter = function (selector) {
    return insertSelectors(arguments, this, true, false, false, false, false, true);
};
fn.insertBefore = function (selector) {
    return insertSelectors(arguments, this, true, true);
};
fn.prepend = function () {
    return insertSelectors(arguments, this, false, true, true, true, true);
};
fn.prependTo = function (selector) {
    return insertSelectors(arguments, this, true, true, true, false, false, true);
};
fn.replaceWith = function (selector) {
    return this.before(selector).remove();
};
fn.replaceAll = function (selector) {
    cash(selector).replaceWith(this);
    return this;
};
fn.wrapAll = function (selector) {
    let structure = cash(selector), wrapper = structure[0];
    while (wrapper.children.length)
        wrapper = wrapper.firstElementChild;
    this.first().before(structure);
    return this.appendTo(wrapper);
};
fn.wrap = function (selector) {
    return this.each((i, ele) => {
        const wrapper = cash(selector)[0];
        cash(ele).wrapAll(!i ? wrapper : wrapper.cloneNode(true));
    });
};
fn.wrapInner = function (selector) {
    return this.each((i, ele) => {
        const $ele = cash(ele), contents = $ele.contents();
        contents.length ? contents.wrapAll(selector) : $ele.append(selector);
    });
};
fn.has = function (selector) {
    const comparator = isString(selector)
        ? (i, ele) => find(selector, ele).length
        : (i, ele) => ele.contains(selector);
    return this.filter(comparator);
};
fn.is = function (comparator) {
    const compare = getCompareFunction(comparator);
    return some.call(this, (ele, i) => compare.call(ele, i, ele));
};
fn.next = function (comparator, _all, _until) {
    return filtered(cash(unique(pluck(this, 'nextElementSibling', _all, _until))), comparator);
};
fn.nextAll = function (comparator) {
    return this.next(comparator, true);
};
fn.nextUntil = function (until, comparator) {
    return this.next(comparator, true, until);
};
fn.not = function (comparator) {
    const compare = getCompareFunction(comparator);
    return this.filter((i, ele) => (!isString(comparator) || isElement(ele)) && !compare.call(ele, i, ele));
};
fn.parent = function (comparator) {
    return filtered(cash(unique(pluck(this, 'parentNode'))), comparator);
};
fn.index = function (selector) {
    const child = selector ? cash(selector)[0] : this[0], collection = selector ? this : cash(child).parent().children();
    return indexOf.call(collection, child);
};
fn.closest = function (comparator) {
    const filtered = this.filter(comparator);
    if (filtered.length)
        return filtered;
    const $parent = this.parent();
    if (!$parent.length)
        return filtered;
    return $parent.closest(comparator);
};
fn.parents = function (comparator, _until) {
    return filtered(cash(unique(pluck(this, 'parentElement', true, _until))), comparator);
};
fn.parentsUntil = function (until, comparator) {
    return this.parents(comparator, until);
};
fn.prev = function (comparator, _all, _until) {
    return filtered(cash(unique(pluck(this, 'previousElementSibling', _all, _until))), comparator);
};
fn.prevAll = function (comparator) {
    return this.prev(comparator, true);
};
fn.prevUntil = function (until, comparator) {
    return this.prev(comparator, true, until);
};
fn.siblings = function (comparator) {
    return filtered(cash(unique(pluck(this, ele => cash(ele).parent().children().not(ele)))), comparator);
};
// @optional ./children.ts
// @optional ./closest.ts
// @optional ./contents.ts
// @optional ./find.ts
// @optional ./has.ts
// @optional ./is.ts
// @optional ./next.ts
// @optional ./next_all.ts
// @optional ./next_until.ts
// @optional ./not.ts
// @optional ./parent.ts
// @optional ./parents.ts
// @optional ./parents_until.ts
// @optional ./prev.ts
// @optional ./prev_all.ts
// @optional ./prev_until.ts
// @optional ./siblings.ts
// @optional attributes/index.ts
// @optional collection/index.ts
// @optional css/index.ts
// @optional data/index.ts
// @optional dimensions/index.ts
// @optional effects/index.ts
// @optional events/index.ts
// @optional forms/index.ts
// @optional manipulation/index.ts
// @optional offset/index.ts
// @optional traversal/index.ts
// @require core/index.ts
// @priority -100
// @require ./cash.ts
export default cash;
export { Cash };

