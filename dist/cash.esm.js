/* MIT https://github.com/kenwheeler/cash */
const doc = document, win = window, docEle = doc.documentElement, createElement = doc.createElement.bind(doc), div = createElement('div'), table = createElement('table'), tbody = createElement('tbody'), tr = createElement('tr'), { isArray, prototype: ArrayProtoType } = Array, { filter, indexOf, map, push, slice, some, splice } = ArrayProtoType;
const idRe = /^#[\w-]*$/, classRe = /^\.[\w-]*$/, htmlRe = /<.+>/, tagRe = /^\w+$/;
// @require ./variables.ts
function find(selector, context = doc) {
    return !isDocument(context) && !isElement(context)
        ? []
        : classRe.test(selector)
            ? context.getElementsByClassName(selector.slice(1))
            : tagRe.test(selector)
                ? context.getElementsByTagName(selector)
                : context.querySelectorAll(selector);
}
// @require ./find.ts
// @require ./variables.ts
class Cash {
    constructor(selector, context = doc) {
        if (!selector)
            return;
        if (isCash(selector))
            return selector;
        let eles = selector;
        if (isString(selector)) {
            const ctx = isCash(context) ? context[0] : context;
            eles = idRe.test(selector)
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
    fn[Symbol['iterator']] = ArrayProtoType[Symbol['iterator']];
}
fn.map = function (callback) {
    return cash(map.call(this, (ele, i) => callback.call(ele, i, ele)));
};
fn.slice = function (start, end) {
    return cash(slice.call(this, start, end));
};
const dashAlphaRe = /-([a-z])/g;
function camelCase(str) {
    return str.replace(dashAlphaRe, (match, letter) => letter.toUpperCase());
}
cash.camelCase = camelCase;
function each(arr, callback, reverse) {
    if (reverse) {
        let i = arr.length;
        while (i--) {
            if (callback.call(arr[i], i, arr[i]) === false)
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
fn.removeProp = function (prop) {
    return this.each((i, ele) => { delete ele[prop]; });
};
cash.extend = function (target, ...objs) {
    const length = arguments.length;
    for (let i = (length < 2 ? 0 : 1); i < length; i++) {
        for (const key in arguments[i]) {
            target[key] = arguments[i][key];
        }
    }
    return target;
};
fn.extend = function (plugins) {
    return cash.extend(fn, plugins);
};
cash.guid = 1;
function matches(ele, selector) {
    const matches = ele && (ele['matches'] || ele['webkitMatchesSelector'] || ele['msMatchesSelector']);
    return !!matches && matches.call(ele, selector);
}
cash.matches = matches;
function isCash(x) {
    return x instanceof Cash;
}
function isWindow(x) {
    return !!x && x === x.window;
}
function isDocument(x) {
    return !!x && x.nodeType === 9;
}
function isElement(x) {
    return !!x && x.nodeType === 1;
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
cash.isWindow = isWindow;
cash.isFunction = isFunction;
cash.isString = isString;
cash.isNumeric = isNumeric;
cash.isArray = isArray;
fn.prop = function (prop, value) {
    if (!prop)
        return;
    if (isString(prop)) {
        if (arguments.length < 2)
            return this[0] && this[0][prop];
        return this.each((i, ele) => { ele[prop] = value; });
    }
    for (const key in prop) {
        this.prop(key, prop[key]);
    }
    return this;
};
fn.get = function (index) {
    if (isUndefined(index))
        return slice.call(this);
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
    return !!cls && some.call(this, (ele) => ele.classList.contains(cls));
};
fn.removeAttr = function (attr) {
    const attrs = getSplitValues(attr);
    return this.each((i, ele) => {
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
            if (!this[0])
                return;
            const value = this[0].getAttribute(attr);
            return isNull(value) ? undefined : value;
        }
        if (isUndefined(value))
            return this;
        if (isNull(value))
            return this.removeAttr(attr);
        return this.each((i, ele) => { ele.setAttribute(attr, value); });
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
function pluck(arr, prop, deep) {
    const plucked = [], isCallback = isFunction(prop);
    for (let i = 0, l = arr.length; i < l; i++) {
        if (isCallback) {
            const val = prop(arr[i]);
            if (val.length)
                push.apply(plucked, val);
        }
        else {
            let val = arr[i][prop];
            while (val != null) {
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
    if (!isElement(ele) || !prop)
        return;
    const style = win.getComputedStyle(ele, null);
    return prop ? (isVariable ? style.getPropertyValue(prop) || undefined : style[prop]) : style;
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
cash.prefixedProp = getPrefixedProp;
// @require core/type_checking.ts
// @require ./is_css_variable.ts
const numericProps = {
    animationIterationCount: true,
    columnCount: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
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
// @require core/camel_case.ts
function getData(ele, key) {
    const value = ele.dataset[key] || ele.dataset[camelCase(key)];
    try {
        return JSON.parse(value);
    }
    catch (_a) { }
    return value;
}
// @require core/camel_case.ts
function setData(ele, key, value) {
    try {
        value = JSON.stringify(value);
    }
    catch (_a) { }
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
        return this.each((i, ele) => { setData(ele, name, value); });
    }
    for (const key in name) {
        this.data(key, name[key]);
    }
    return this;
}
fn.data = data;
// @optional ./data.ts
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
                return win[name];
            return this[0][`${outer ? 'offset' : 'client'}${prop}`] + (includeMargins && outer ? computeStyleInt(this[0], `margin${i ? 'Top' : 'Left'}`) + computeStyleInt(this[0], `margin${i ? 'Bottom' : 'Right'}`) : 0);
        };
    });
});
each(['width', 'height'], (index, prop) => {
    fn[prop] = function (value) {
        if (!this[0])
            return isUndefined(value) ? undefined : this;
        if (!arguments.length) {
            if (isWindow(this[0]))
                return this[0][camelCase(`outer-${prop}`)];
            return this[0].getBoundingClientRect()[prop] - getExtraSpace(this[0], !index);
        }
        const valueNumber = parseInt(value, 10);
        return this.each((i, ele) => {
            if (!isElement(ele))
                return;
            const boxSizing = computeStyle(ele, 'boxSizing');
            ele.style[prop] = getSuffixedValue(prop, valueNumber + (boxSizing === 'border-box' ? getExtraSpace(ele, !index) : 0));
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
    callback.guid = callback.guid || cash.guid++;
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
        this.each((i, ele) => { removeEvent(ele); });
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
            const [name, namespaces] = parseEventName(getEventNameBubbling(eventFullName));
            this.each((i, ele) => { removeEvent(ele, name, namespaces, selector, callback); });
        });
    }
    return this;
};
function on(eventFullName, selector, callback, _one) {
    if (!isString(eventFullName)) {
        for (const key in eventFullName) {
            this.on(key, selector, eventFullName[key]);
        }
        return this;
    }
    if (isFunction(selector)) {
        callback = selector;
        selector = '';
    }
    each(getSplitValues(eventFullName), (i, eventFullName) => {
        const [name, namespaces] = parseEventName(getEventNameBubbling(eventFullName));
        this.each((i, ele) => {
            const finalCallback = function (event) {
                if (event.namespace && !hasNamespaces(namespaces, event.namespace.split(eventsNamespacesSeparator)))
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
                    event.___cd = true; // Delegate
                }
                if (event.___cd) {
                    Object.defineProperty(event, 'currentTarget', {
                        configurable: true,
                        get() {
                            return thisArg;
                        }
                    });
                }
                const returnValue = callback.call(thisArg, event, event.data);
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
function one(eventFullName, selector, callback) {
    return this.on(eventFullName, selector, callback, true);
}
;
fn.one = one;
fn.ready = function (callback) {
    if (doc.readyState !== 'loading') {
        callback(cash);
    }
    else {
        doc.addEventListener('DOMContentLoaded', () => { callback(cash); });
    }
    return this;
};
fn.trigger = function (event, data) {
    if (isString(event)) {
        const [name, namespaces] = parseEventName(event), type = eventsMouseRe.test(name) ? 'MouseEvents' : 'HTMLEvents';
        event = doc.createEvent(type);
        event.initEvent(name, true, true);
        event.namespace = namespaces.join(eventsNamespacesSeparator);
    }
    event.data = data;
    const isEventFocus = (event.type in eventsFocus);
    return this.each((i, ele) => {
        if (isEventFocus && isFunction(ele[event.type])) {
            ele[event.type]();
        }
        else {
            ele.dispatchEvent(event);
        }
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
const queryEncodeSpaceRe = /%20/g;
function queryEncode(prop, value) {
    return `&${encodeURIComponent(prop)}=${encodeURIComponent(value).replace(queryEncodeSpaceRe, '+')}`;
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
    if (isUndefined(value))
        return this[0] && getValue(this[0]);
    return this.each((i, ele) => {
        if (ele.tagName === 'SELECT') {
            const eleValue = isArray(value) ? value : (isNull(value) ? [] : [value]);
            each(ele.options, (i, option) => {
                option.selected = eleValue.indexOf(option.value) >= 0;
            });
        }
        else {
            ele.value = isNull(value) ? '' : value;
        }
    });
}
fn.val = val;
fn.clone = function () {
    return this.map((i, ele) => ele.cloneNode(true));
};
fn.detach = function () {
    return this.each((i, ele) => {
        if (ele.parentNode) {
            ele.parentNode.removeChild(ele);
        }
    });
};
const fragmentRe = /^\s*<(\w+)[^>]*>/, singleTagRe = /^\s*<(\w+)\s*\/?>(?:<\/\1>)?\s*$/;
const containers = {
    '*': div,
    tr: tbody,
    td: tr,
    th: tr,
    thead: table,
    tbody: table,
    tfoot: table
};
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
    if (isUndefined(html))
        return this[0] && this[0].innerHTML;
    return this.each((i, ele) => { ele.innerHTML = html; });
}
fn.html = html;
fn.remove = function () {
    return this.detach().off();
};
function text(text) {
    if (isUndefined(text))
        return this[0] ? this[0].textContent : '';
    return this.each((i, ele) => { ele.textContent = text; });
}
;
fn.text = text;
fn.unwrap = function () {
    this.parent().each((i, ele) => {
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
        top: rect.top + win.pageYOffset - docEle.clientTop,
        left: rect.left + win.pageXOffset - docEle.clientLeft
    };
};
fn.offsetParent = function () {
    return cash(this[0] && this[0].offsetParent);
};
fn.position = function () {
    const ele = this[0];
    if (!ele)
        return;
    return {
        left: ele.offsetLeft,
        top: ele.offsetTop
    };
};
fn.children = function (comparator) {
    return filtered(cash(unique(pluck(this, ele => ele.children))), comparator);
};
fn.contents = function () {
    return cash(unique(pluck(this, ele => ele.tagName === 'IFRAME' ? [ele.contentDocument] : ele.childNodes)));
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
function insertElement(anchor, target, left, inside) {
    if (inside) { // prepend/append
        anchor.insertBefore(target, left ? anchor.firstElementChild : null);
    }
    else { // before/after
        anchor.parentNode.insertBefore(target, left ? anchor : anchor.nextElementSibling);
    }
    evalScripts(target, anchor.ownerDocument);
}
// @require ./insert_element.ts
function insertSelectors(selectors, anchors, inverse, left, inside, reverseLoop1, reverseLoop2, reverseLoop3) {
    each(selectors, (si, selector) => {
        each(cash(selector), (ti, target) => {
            each(cash(anchors), (ai, anchor) => {
                const anchorFinal = inverse ? target : anchor, targetFinal = inverse ? anchor : target;
                insertElement(anchorFinal, !ai ? targetFinal : targetFinal.cloneNode(true), left, inside);
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
fn.next = function (comparator, _all) {
    return filtered(cash(unique(pluck(this, 'nextElementSibling', _all))), comparator);
};
fn.nextAll = function (comparator) {
    return this.next(comparator, true);
};
fn.not = function (comparator) {
    const compare = getCompareFunction(comparator);
    return this.filter((i, ele) => !compare.call(ele, i, ele));
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
fn.parents = function (comparator) {
    return filtered(cash(unique(pluck(this, 'parentElement', true))), comparator);
};
fn.prev = function (comparator, _all) {
    return filtered(cash(unique(pluck(this, 'previousElementSibling', _all))), comparator);
};
fn.prevAll = function (comparator) {
    return this.prev(comparator, true);
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
// @optional ./not.ts
// @optional ./parent.ts
// @optional ./parents.ts
// @optional ./prev.ts
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

