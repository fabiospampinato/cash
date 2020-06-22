declare const propMap: Record<string, string>;
declare function attempt<T, U>(fn: ((arg?: U) => T), arg?: U): T | U;
interface Event {
    namespace: string;
    data: any;
    relatedTarget?: Node | null;
    ___cd?: boolean;
    ___ifocus?: boolean;
    ___iblur?: boolean;
    ___ot?: string;
    ___td?: boolean;
}
interface Cash {
    [index: number]: EleLoose | undefined;
    length: number;
    splice(start: number, deleteCount?: number): EleLoose[];
    splice(start: number, deleteCount: number, ...items: Ele[]): EleLoose[];
}
interface CashStatic {
    fn: Cash;
}
declare type falsy = undefined | null | false | 0 | '';
declare type Ele = Window | Document | HTMLElement | Element | Node;
declare type EleLoose = HTMLElement & Element & Node;
declare type Selector = falsy | string | Function | HTMLCollection | NodeList | Ele | Ele[] | ArrayLike<Ele> | Cash;
declare type Comparator = string | Ele | Cash | ((this: EleLoose, index: number, ele: EleLoose) => boolean);
declare type Context = Document | HTMLElement | Element;
declare type EventCallback = {
    (event: any, data?: any): any;
    guid?: number;
};
declare const doc: Document, win: Window & typeof globalThis, docEle: HTMLElement, createElement: any, div: any, table: any, tbody: any, tr: any, isArray: (arg: any) => arg is any[], ArrayPrototype: any[], concat: {
    (...items: ConcatArray<any>[]): any[];
    (...items: any[]): any[];
}, filter: {
    <S extends any>(callbackfn: (value: any, index: number, array: any[]) => value is S, thisArg?: any): S[];
    (callbackfn: (value: any, index: number, array: any[]) => unknown, thisArg?: any): any[];
}, indexOf: (searchElement: any, fromIndex?: number) => number, map: <U>(callbackfn: (value: any, index: number, array: any[]) => U, thisArg?: any) => U[], push: (...items: any[]) => number, slice: (start?: number, end?: number) => any[], some: (callbackfn: (value: any, index: number, array: any[]) => unknown, thisArg?: any) => boolean, splice: {
    (start: number, deleteCount?: number): any[];
    (start: number, deleteCount: number, ...items: any[]): any[];
};
declare const idRe: RegExp, classRe: RegExp, htmlRe: RegExp, tagRe: RegExp;
declare function find(selector: string, context: Ele): ArrayLike<Element>;
declare class Cash {
    constructor(selector?: Selector, context?: Context | Cash);
    init(selector?: Selector, context?: Context | Cash): Cash;
}
declare const fn: Cash, cash: ((selector?: Selector, context?: Context | Cash) => Cash) & CashStatic;
declare type MapCallback<T> = (this: T, index: number, ele: T) => Ele;
interface Cash {
    map(callback: MapCallback<EleLoose>): Cash;
}
interface Cash {
    slice(start?: number, end?: number): Cash;
}
declare const dashAlphaRe: RegExp;
declare function camelCase(str: string): string;
declare type EachCallback<T> = (this: T, index: number, ele: T) => any;
interface CashStatic {
    each<T>(arr: ArrayLike<T>, callback: EachCallback<T>): void;
}
declare function each<T, U extends ArrayLike<T> = ArrayLike<T>>(arr: U, callback: EachCallback<U[0]>, _reverse?: boolean): U;
interface Cash {
    each(callback: EachCallback<EleLoose>): this;
}
interface Cash {
    removeProp(prop: string): this;
}
interface CashStatic {
    extend(): any;
    extend(target: any): typeof cash;
    extend(target: any, ...objs: any[]): any;
    extend(deep: boolean, target: any, ...objs: any[]): any;
}
interface Cash {
    extend(plugins: Record<any, any>): this;
}
declare function extend(...objs: any[]): any;
interface CashStatic {
    guid: number;
}
declare function matches(ele: any, selector: string): boolean;
interface CashStatic {
    isPlainObject(test: any): any;
}
declare function isPlainObject(x: any): boolean;
interface CashStatic {
    isWindow(x: any): x is Window;
    isFunction(x: any): x is Function;
    isNumeric(x: any): boolean;
    isArray(x: any): x is Array<any>;
}
declare function isCash(x: any): x is Cash;
declare function isWindow(x: any): x is Window;
declare function isDocument(x: any): x is Document;
declare function isElement(x: any): x is HTMLElement;
declare function isFunction(x: any): x is Function;
declare function isString(x: any): x is string;
declare function isUndefined(x: any): x is undefined;
declare function isNull(x: any): x is null;
declare function isNumeric(x: any): boolean;
interface Cash {
    prop(prop: string): any;
    prop(prop: string, value: any): this;
    prop(props: Record<string, any>): this;
}
interface Cash {
    get(): EleLoose[];
    get(index: number): EleLoose | undefined;
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
declare function getCompareFunction(comparator?: Comparator): ((i: number, ele: EleLoose) => boolean);
interface Cash {
    filter(comparator?: Comparator): Cash;
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
    attr(): undefined;
    attr(attrs: string): string | null;
    attr(attrs: string, value: string): this;
    attr(attrs: Record<string, string>): this;
}
declare function attr(this: Cash): undefined;
declare function attr(this: Cash, attr: string): string | null;
declare function attr(this: Cash, attr: string, value: string): Cash;
declare function attr(this: Cash, attr: Record<string, string>): Cash;
interface Cash {
    toggleClass(classes: string, force?: boolean): this;
}
interface Cash {
    addClass(classes: string): this;
}
interface Cash {
    removeClass(classes?: string): this;
}
declare type PluckCallback<T> = (ele: T) => ArrayLike<Ele>;
declare function pluck<T, U extends ArrayLike<T> = ArrayLike<T>>(arr: U, prop: string | PluckCallback<U[0]>, deep?: boolean, until?: Comparator): Array<Ele>;
interface CashStatic {
    unique<T>(arr: ArrayLike<T>): ArrayLike<T>;
}
declare function unique<T>(arr: ArrayLike<T>): ArrayLike<T>;
interface Cash {
    add(selector: Selector, context?: Context): Cash;
}
declare function computeStyle(ele: EleLoose, prop: string, isVariable?: boolean): string | undefined;
declare function computeStyleInt(ele: EleLoose, prop: string): number;
declare const cssVariableRe: RegExp;
declare function isCSSVariable(prop: string): boolean;
declare const prefixedProps: {
    [prop: string]: string;
}, style: any, vendorsPrefixes: string[];
declare function getPrefixedProp(prop: string, isVariable?: boolean): string;
declare const numericProps: {
    [prop: string]: true | undefined;
};
declare function getSuffixedValue(prop: string, value: number | string, isVariable?: boolean): string;
interface Cash {
    css(prop: string): string | undefined;
    css(prop: string, value: number | string): this;
    css(props: Record<string, number | string>): this;
}
declare function css(this: Cash, prop: string): string | undefined;
declare function css(this: Cash, prop: string, value: number | string): Cash;
declare function css(this: Cash, prop: Record<string, number | string>): Cash;
declare const JSONStringRe: RegExp;
declare function getData(ele: EleLoose, key: string): any;
declare function setData(ele: EleLoose, key: string, value: any): void;
interface Cash {
    data(): Record<string, any> | undefined;
    data(name: string): any;
    data(name: string, value: any): this;
    data(datas: Record<string, any>): this;
}
declare function data(this: Cash): Record<string, any> | undefined;
declare function data(this: Cash, name: string): any;
declare function data(this: Cash, name: string, value: any): Cash;
declare function data(this: Cash, name: Record<string, any>): Cash;
declare function getDocumentDimension(doc: Document, dimension: 'Width' | 'Height'): number;
declare function getExtraSpace(ele: EleLoose, xAxis?: boolean): number;
interface Cash {
    innerWidth(): number | undefined;
    innerHeight(): number | undefined;
    outerWidth(includeMargins?: boolean): number;
    outerHeight(includeMargins?: boolean): number;
}
interface Cash {
    width(): number;
    width(value: number | string): this;
    height(): number;
    height(value: number | string): this;
}
declare const defaultDisplay: {
    [tagName: string]: string;
};
declare function getDefaultDisplay(tagName: string): string;
declare function isHidden(ele: EleLoose): boolean;
declare const displayProperty = "___cd";
interface Cash {
    toggle(force?: boolean): this;
}
interface Cash {
    hide(): this;
}
interface Cash {
    show(): this;
}
declare function hasNamespaces(ns1: string[], ns2?: string[]): boolean;
declare const eventsNamespace = "___ce", eventsNamespacesSeparator = ".", eventsFocus: {
    [event: string]: string | undefined;
}, eventsHover: {
    [event: string]: string | undefined;
}, eventsMouseRe: RegExp;
declare function getEventNameBubbling(name: string): string;
declare function getEventsCache(ele: EleLoose): {
    [event: string]: [string[], string, EventCallback][];
};
declare function addEvent(ele: EleLoose, name: string, namespaces: string[], selector: string, callback: EventCallback): void;
declare function parseEventName(eventName: string): [string, string[]];
declare function removeEvent(ele: EleLoose, name?: string, namespaces?: string[], selector?: string, callback?: EventCallback): void;
interface Cash {
    off(): this;
    off(events: string): this;
    off(events: Record<string, EventCallback>): this;
    off(events: string, callback: EventCallback): this;
    off(events: string, selector: string, callback: EventCallback): this;
}
interface Cash {
    on(events: Record<string, EventCallback>): this;
    on(events: Record<string, EventCallback>, selector: string): this;
    on(events: Record<string, EventCallback>, data: any): this;
    on(events: Record<string, EventCallback>, selector: string | null | undefined, data: any): this;
    on(events: string, callback: EventCallback): this;
    on(events: string, selector: string, callback: EventCallback): this;
    on(events: string, data: any, callback: EventCallback): this;
    on(events: string, selector: string | null | undefined, data: any, callback: EventCallback, _one?: boolean): this;
}
declare function on(this: Cash, eventFullName: Record<string, EventCallback>): Cash;
declare function on(this: Cash, eventFullName: Record<string, EventCallback>, selector: string): Cash;
declare function on(this: Cash, eventFullName: Record<string, EventCallback>, data: any): Cash;
declare function on(this: Cash, eventFullName: Record<string, EventCallback>, selector: string | null | undefined, data: any): Cash;
declare function on(this: Cash, eventFullName: string, callback: EventCallback): Cash;
declare function on(this: Cash, eventFullName: string, selector: string, callback: EventCallback): Cash;
declare function on(this: Cash, eventFullName: string, data: any, callback: EventCallback): Cash;
declare function on(this: Cash, eventFullName: string, selector: string | null | undefined, data: any, callback: EventCallback, _one?: boolean): Cash;
interface Cash {
    one(events: Record<string, EventCallback>): this;
    one(events: Record<string, EventCallback>, selector: string): this;
    one(events: Record<string, EventCallback>, data: any): this;
    one(events: Record<string, EventCallback>, selector: string | null | undefined, data: any): this;
    one(events: string, callback: EventCallback): this;
    one(events: string, selector: string, callback: EventCallback): this;
    one(events: string, data: any, callback: EventCallback): this;
    one(events: string, selector: string | null | undefined, data: any, callback: EventCallback): this;
}
declare function one(this: Cash, eventFullName: Record<string, EventCallback>): Cash;
declare function one(this: Cash, eventFullName: Record<string, EventCallback>, selector: string): Cash;
declare function one(this: Cash, eventFullName: Record<string, EventCallback>, data: any): Cash;
declare function one(this: Cash, eventFullName: Record<string, EventCallback>, selector: string | null | undefined, data: any): Cash;
declare function one(this: Cash, eventFullName: string, callback: EventCallback): Cash;
declare function one(this: Cash, eventFullName: string, selector: string, callback: EventCallback): Cash;
declare function one(this: Cash, eventFullName: string, data: any, callback: EventCallback): Cash;
declare function one(this: Cash, eventFullName: string, selector: string | null | undefined, data: any, callback: EventCallback): Cash;
interface Cash {
    ready(callback: Function): this;
}
interface Cash {
    trigger(event: Event | string, data?: any): this;
}
declare function getValue(ele: EleLoose): string | string[];
declare const queryEncodeSpaceRe: RegExp, queryEncodeCRLFRe: RegExp;
declare function queryEncode(prop: string, value: string): string;
interface Cash {
    serialize(): string;
}
declare const skippableRe: RegExp, checkableRe: RegExp;
interface Cash {
    val(): string | string[];
    val(value: string | string[]): this;
}
declare function val(this: Cash): string | string[];
declare function val(this: Cash, value: string | string[]): Cash;
interface Cash {
    clone(): this;
}
interface Cash {
    detach(comparator?: Comparator): this;
}
interface CashStatic {
    parseHTML(html: string): EleLoose[];
}
declare const fragmentRe: RegExp, singleTagRe: RegExp;
declare const containers: {
    '*': any;
    tr: any;
    td: any;
    th: any;
    thead: any;
    tbody: any;
    tfoot: any;
};
declare function parseHTML(html: string): EleLoose[];
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
    remove(comparator?: Comparator): this;
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
declare const HTMLCDATARe: RegExp, scriptTypeRe: RegExp, scriptAttributes: ('type' | 'src' | 'nonce' | 'noModule')[];
declare function evalScripts(node: Node, doc: Document): void;
declare function insertElement(anchor: EleLoose, target: EleLoose, left?: boolean, inside?: boolean, evaluate?: boolean): void;
declare function insertSelectors<T extends ArrayLike<EleLoose> = ArrayLike<EleLoose>>(selectors: ArrayLike<Selector>, anchors: T, inverse?: boolean, left?: boolean, inside?: boolean, reverseLoop1?: boolean, reverseLoop2?: boolean, reverseLoop3?: boolean): T;
interface Cash {
    after(...selectors: Selector[]): this;
}
interface Cash {
    append(...selectors: Selector[]): this;
}
interface Cash {
    appendTo(selector: Selector): this;
}
interface Cash {
    before(...selectors: Selector[]): this;
}
interface Cash {
    insertAfter(selector: Selector): this;
}
interface Cash {
    insertBefore(selector: Selector): this;
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
    has(selector: string | Node): Cash;
}
interface Cash {
    is(comparator?: Comparator): boolean;
}
interface Cash {
    next(comparator?: Comparator, _all?: boolean, _until?: Comparator): Cash;
}
interface Cash {
    nextAll(comparator?: Comparator): Cash;
}
interface Cash {
    nextUntil(until?: Comparator, comparator?: Comparator): Cash;
}
interface Cash {
    not(comparator?: Comparator): Cash;
}
interface Cash {
    parent(comparator?: Comparator): Cash;
}
interface Cash {
    index(selector?: Selector): number;
}
interface Cash {
    closest(comparator?: Comparator): Cash;
}
interface Cash {
    parents(comparator?: Comparator, _until?: Comparator): Cash;
}
interface Cash {
    parentsUntil(until?: Comparator, comparator?: Comparator): Cash;
}
interface Cash {
    prev(comparator?: Comparator, _all?: boolean, _until?: Comparator): Cash;
}
interface Cash {
    prevAll(comparator?: Comparator): Cash;
}
interface Cash {
    prevUntil(until?: Comparator, comparator?: Comparator): Cash;
}
interface Cash {
    siblings(comparator?: Comparator): Cash;
}
