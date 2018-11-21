interface Cash {
    [index: number]: Window & Document & HTMLElement & Element & Node;
    length: number;
    splice(start: number, deleteCount?: number): any;
    splice(start: number, deleteCount: number, ...items: Ele[]): any;
}
interface CashStatic {
    fn: Cash;
}
declare type plainObject = {
    [index: string]: any;
};
declare type falsy = undefined | null | false | 0 | '';
declare type Ele = Window | Document | HTMLElement | Element | Node;
declare type Selector = falsy | string | Function | HTMLCollection | NodeList | Ele | Ele[] | ArrayLike<any> | Cash;
declare type Comparator = string | Function | Ele | Cash;
declare type Context = Document | HTMLElement | Element;
declare const doc: Document, win: Window, div: HTMLDivElement, filter: {
    <S extends any>(callbackfn: (value: any, index: number, array: any[]) => value is S, thisArg?: any): S[];
    (callbackfn: (value: any, index: number, array: any[]) => any, thisArg?: any): any[];
}, indexOf: (searchElement: any, fromIndex?: number) => number, map: <U>(callbackfn: (value: any, index: number, array: any[]) => U, thisArg?: any) => U[], push: (...items: any[]) => number, reverse: () => any[], slice: (start?: number, end?: number) => any[], some: (callbackfn: (value: any, index: number, array: any[]) => boolean, thisArg?: any) => boolean, splice: {
    (start: number, deleteCount?: number): any[];
    (start: number, deleteCount: number, ...items: any[]): any[];
};
declare const idRe: RegExp, classRe: RegExp, htmlRe: RegExp, tagRe: RegExp;
declare function find(selector: string, context?: Context): any[] | HTMLCollectionOf<Element> | NodeListOf<Element>;
declare class Cash {
    constructor(selector?: Selector, context?: Context | Cash);
    init(selector?: Selector, context?: Context | Cash): Cash;
}
declare const cash: ((selector?: Selector, context?: Element | HTMLElement | Document | Cash) => Cash) & CashStatic;
interface Cash {
    get(): Ele[];
    get(index: number): Ele;
}
interface Cash {
    eq(index: number): Cash;
}
interface Cash {
    first(): Cash;
}
interface Cash {
    last(): Cash;
}
interface Cash {
    map(callback: Function): Cash;
}
interface Cash {
    slice(start?: number, end?: number): Cash;
}
declare const dashAlphaRe: RegExp;
declare function camelCaseReplace(all: any, letter: any): any;
declare function camelCase(str: string): string;
interface CashStatic {
    camelCase(str: string): string;
}
declare function each(arr: ArrayLike<any>, callback: Function): void;
interface CashStatic {
    each(arr: ArrayLike<any>, callback: Function): void;
}
interface Cash {
    each(callback: Function): this;
}
interface Cash {
    removeProp(prop: string): this;
}
declare function extend(target: any, ...objs: any[]): any;
interface Cash {
    extend(plugins: plainObject): this;
}
interface CashStatic {
    extend(target: any, ...objs: any[]): any;
}
declare let guid: number;
interface CashStatic {
    guid: number;
}
declare function matches(ele: HTMLElement, selector: string): boolean;
interface CashStatic {
    matches(ele: HTMLElement, selector: string): boolean;
}
declare function pluck(arr: ArrayLike<any>, prop: string, deep?: boolean): ArrayLike<any>;
declare function isCash(x: any): x is Cash;
declare function isFunction(x: any): x is Function;
declare function isString(x: any): x is string;
declare function isNumeric(x: any): boolean;
declare const isArray: (arg: any) => arg is any[];
interface CashStatic {
    isFunction(x: any): x is Function;
    isString(x: any): x is string;
    isNumeric(x: any): boolean;
    isArray(x: any): x is Array<any>;
}
interface Cash {
    prop(prop: string): any;
    prop(prop: string, value: any): this;
    prop(props: plainObject): this;
}
declare function getCompareFunction(comparator: Comparator): Function;
interface Cash {
    filter(comparator: Comparator): Cash;
}
declare function filtered(collection: Cash, comparator?: Comparator): Cash;
declare const splitValuesRe: RegExp;
declare function getSplitValues(str: string): RegExpMatchArray;
interface Cash {
    hasClass(cls: string): boolean;
}
interface Cash {
    removeAttr(attrs: string): this;
}
interface Cash {
    attr(attrs: string): any;
    attr(attrs: string, value: any): this;
    attr(attrs: plainObject): this;
}
declare function attr(this: Cash, attr: string): any;
declare function attr(this: Cash, attr: string, value: any): Cash;
declare function attr(this: Cash, attr: plainObject): Cash;
interface Cash {
    toggleClass(classes: string, force?: boolean): this;
}
interface Cash {
    addClass(classes: string): this;
}
interface Cash {
    removeClass(classes?: string): this;
}
declare function unique(arr: ArrayLike<any>): ArrayLike<any>;
interface CashStatic {
    unique(arr: ArrayLike<any>): ArrayLike<any>;
}
interface Cash {
    add(selector: Selector, context?: Context): Cash;
}
declare function computeStyle(ele: HTMLElement, prop: string, isVariable?: boolean): undefined | string;
declare function computeStyleInt(ele: HTMLElement, prop: string): number;
declare const cssVariableRe: RegExp;
declare function isCSSVariable(prop: string): boolean;
declare const prefixedProps: plainObject, style: CSSStyleDeclaration, vendorsPrefixes: string[];
declare function getPrefixedProp(prop: string, isVariable?: boolean): string;
interface CashStatic {
    prefixedProp(prop: string, isVariable?: boolean): string;
}
declare const numericProps: {
    animationIterationCount: boolean;
    columnCount: boolean;
    flexGrow: boolean;
    flexShrink: boolean;
    fontWeight: boolean;
    lineHeight: boolean;
    opacity: boolean;
    order: boolean;
    orphans: boolean;
    widows: boolean;
    zIndex: boolean;
};
declare function getSuffixedValue(prop: string, value: number | string, isVariable?: boolean): number | string;
interface Cash {
    css(prop: string): any;
    css(prop: string, value: any): this;
    css(props: plainObject): this;
}
declare function css(this: Cash, prop: string): any;
declare function css(this: Cash, prop: string, value: any): Cash;
declare function css(this: Cash, prop: plainObject): Cash;
declare const dataNamespace = "__cashData", dataAttributeRe: RegExp;
declare function hasData(ele: HTMLElement): boolean;
interface CashStatic {
    hasData(ele: HTMLElement): boolean;
}
declare function getDataCache(ele: HTMLElement): plainObject;
declare function getData(ele: HTMLElement, key?: string): plainObject;
declare function removeData(ele: HTMLElement, key: string): void;
declare function setData(ele: HTMLElement, key: string, value: any): void;
interface Cash {
    data(name: string): any;
    data(name: string, value: any): this;
    data(datas: plainObject): this;
}
declare function data(this: Cash, name: string): any;
declare function data(this: Cash, name: string, value: any): Cash;
declare function data(this: Cash, name: plainObject): Cash;
interface Cash {
    removeData(key: string): this;
}
declare function getExtraSpace(ele: HTMLElement, xAxis?: boolean): number;
interface Cash {
    innerWidth(): number;
    innerHeight(): number;
}
interface Cash {
    width(): number;
    width(value: number | string): this;
    height(): number;
    height(value: number | string): this;
}
interface Cash {
    outerWidth(includeMargins?: boolean): number;
    outerHeight(includeMargins?: boolean): number;
}
declare const defaultDisplay: {};
declare function getDefaultDisplay(tagName: string): string;
declare function isHidden(ele: HTMLElement): boolean;
interface Cash {
    toggle(force?: boolean): this;
}
interface Cash {
    hide(): this;
}
interface Cash {
    show(): this;
}
declare function hasNamespaces(ns1: string[], ns2: string[]): boolean;
declare const eventsNamespace = "__cashEvents", eventsNamespacesSeparator = ".", eventsFocus: {
    focus: string;
    blur: string;
}, eventsHover: {
    mouseenter: string;
    mouseleave: string;
}, eventsMouseRe: RegExp;
declare function getEventNameBubbling(name: string): any;
declare function getEventsCache(ele: Ele): plainObject;
declare function addEvent(ele: Ele, name: string, namespaces: string[], callback: Function): void;
declare function parseEventName(eventName: string): [string, string[]];
declare function removeEvent(ele: Ele, name?: string, namespaces?: string[], callback?: Function): void;
interface Cash {
    off(events?: string, callback?: Function): this;
}
interface Cash {
    on(events: plainObject): this;
    on(events: string, callback: Function, _one?: boolean): this;
    on(events: string, selector: string | Function, callback: Function, _one?: boolean): this;
}
declare function on(this: Cash, eventFullName: plainObject): Cash;
declare function on(this: Cash, eventFullName: string, callback: Function, _one?: boolean): Cash;
declare function on(this: Cash, eventFullName: string, selector: string | Function, callback: Function, _one?: boolean): Cash;
interface Cash {
    one(events: plainObject): this;
    one(events: string, callback: Function): this;
    one(events: string, selector: string | Function, callback: Function): this;
}
declare function one(this: Cash, eventFullName: plainObject): Cash;
declare function one(this: Cash, eventFullName: string, callback: Function): Cash;
declare function one(this: Cash, eventFullName: string, selector: string | Function, callback: Function): Cash;
interface Cash {
    ready(callback: Function): this;
}
interface Cash {
    trigger(event: string | Event, data?: any): this;
}
declare function getValue(ele: any): string | string[];
declare const queryEncodeSpaceRe: RegExp;
declare function queryEncode(prop: string, value: string): string;
declare const skippableRe: RegExp, checkableRe: RegExp;
interface Cash {
    serialize(): string;
}
interface Cash {
    val(): string | string[];
    val(value: any): this;
}
declare function val(this: Cash): string | string[];
declare function val(this: Cash, value: string | string[]): Cash;
interface Cash {
    clone(): this;
}
interface Cash {
    detach(): this;
}
declare const fragmentRe: RegExp, singleTagRe: RegExp;
declare let containers: {
    [index: string]: HTMLElement;
};
declare function initContainers(): void;
declare function parseHTML(html: string): Ele[];
interface CashStatic {
    parseHTML(html: string): Ele[];
}
interface Cash {
    empty(): this;
}
interface Cash {
    html(): string;
    html(html: string): this;
}
declare function html(this: Cash): string;
declare function html(this: Cash, html: string): Cash;
interface Cash {
    remove(): this;
}
interface Cash {
    text(): string;
    text(text: string): this;
}
declare function text(this: Cash): string;
declare function text(this: Cash, text: string): Cash;
interface Cash {
    unwrap(): this;
}
declare const docEle: HTMLElement;
interface Cash {
    offset(): undefined | {
        top: number;
        left: number;
    };
}
interface Cash {
    offsetParent(): Cash;
}
interface Cash {
    position(): undefined | {
        top: number;
        left: number;
    };
}
interface Cash {
    children(comparator?: Comparator): Cash;
}
interface Cash {
    contents(): Cash;
}
interface Cash {
    find(selector: string): Cash;
}
declare const scriptTypeRe: RegExp, HTMLCDATARe: RegExp;
declare function evalScripts(node: Node): void;
declare function insertElement(anchor: Node, child: Node, prepend?: boolean, prependTarget?: Node): void;
declare function insertContent(parent: Cash, child: Cash, prepend?: boolean): void;
interface Cash {
    append(...selectors: Selector[]): this;
}
interface Cash {
    appendTo(selector: Selector): this;
}
interface Cash {
    insertAfter(selector: Selector): this;
}
interface Cash {
    after(...selectors: Selector[]): this;
}
interface Cash {
    insertBefore(selector: Selector): this;
}
interface Cash {
    before(...selectors: Selector[]): this;
}
interface Cash {
    prepend(...selectors: Selector[]): this;
}
interface Cash {
    prependTo(selector: Selector): this;
}
interface Cash {
    replaceWith(selector: Selector): this;
}
interface Cash {
    replaceAll(selector: Selector): this;
}
interface Cash {
    wrapAll(selector?: Selector): this;
}
interface Cash {
    wrap(selector?: Selector): this;
}
interface Cash {
    wrapInner(selector?: Selector): this;
}
interface Cash {
    has(selector: string | HTMLElement): Cash;
}
interface Cash {
    is(comparator: Comparator): boolean;
}
interface Cash {
    next(comparator?: Comparator, _all?: boolean): Cash;
}
interface Cash {
    nextAll(comparator?: Comparator): Cash;
}
interface Cash {
    not(comparator: Comparator): Cash;
}
interface Cash {
    parent(comparator?: Comparator): Cash;
}
interface Cash {
    index(selector?: Selector): number;
}
interface Cash {
    closest(comparator: Comparator): Cash;
}
interface Cash {
    parents(comparator?: Comparator): Cash;
}
interface Cash {
    prev(comparator?: Comparator, _all?: boolean): Cash;
}
interface Cash {
    prevAll(comparator?: Comparator): Cash;
}
interface Cash {
    siblings(comparator?: Comparator): Cash;
}
//# sourceMappingURL=cash.d.ts.map