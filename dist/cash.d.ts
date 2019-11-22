interface Cash {
    [index: number]: EleLoose | undefined;
    length: number;
    splice(start: number, deleteCount?: number): EleLoose[];
    splice(start: number, deleteCount: number, ...items: Ele[]): EleLoose[];
}
interface CashStatic {
    fn: Cash;
}
declare type plainObject = {
    [index: string]: any;
};
declare type falsy = undefined | null | false | 0 | '';
declare type EleHTML = HTMLElement | HTMLAnchorElement | HTMLAppletElement | HTMLAreaElement | HTMLAudioElement | HTMLBRElement | HTMLBaseElement | HTMLBaseFontElement | HTMLBodyElement | HTMLButtonElement | HTMLCanvasElement | HTMLDListElement | HTMLDataElement | HTMLDataListElement | HTMLDetailsElement | HTMLDialogElement | HTMLDirectoryElement | HTMLDivElement | HTMLEmbedElement | HTMLFieldSetElement | HTMLFontElement | HTMLFormElement | HTMLFrameElement | HTMLFrameSetElement | HTMLHRElement | HTMLHeadElement | HTMLHeadingElement | HTMLHtmlElement | HTMLIFrameElement | HTMLImageElement | HTMLInputElement | HTMLLIElement | HTMLLabelElement | HTMLLegendElement | HTMLLinkElement | HTMLMapElement | HTMLMarqueeElement | HTMLMediaElement | HTMLMenuElement | HTMLMetaElement | HTMLMeterElement | HTMLModElement | HTMLOListElement | HTMLObjectElement | HTMLOptGroupElement | HTMLOptionElement | HTMLOrSVGElement | HTMLOutputElement | HTMLParagraphElement | HTMLParamElement | HTMLPictureElement | HTMLPreElement | HTMLProgressElement | HTMLQuoteElement | HTMLScriptElement | HTMLSelectElement | HTMLSlotElement | HTMLSourceElement | HTMLSpanElement | HTMLStyleElement | HTMLTableCaptionElement | HTMLTableCellElement | HTMLTableColElement | HTMLTableDataCellElement | HTMLTableElement | HTMLTableHeaderCellElement | HTMLTableRowElement | HTMLTableSectionElement | HTMLTemplateElement | HTMLTextAreaElement | HTMLTimeElement | HTMLTitleElement | HTMLTrackElement | HTMLUListElement | HTMLUnknownElement | HTMLVideoElement;
declare type EleHTMLLoose = HTMLElement & HTMLAnchorElement & HTMLAppletElement & HTMLAreaElement & HTMLAudioElement & HTMLBRElement & HTMLBaseElement & HTMLBaseFontElement & HTMLBodyElement & HTMLButtonElement & HTMLCanvasElement & HTMLDListElement & HTMLDataElement & HTMLDataListElement & HTMLDetailsElement & HTMLDialogElement & HTMLDirectoryElement & HTMLDivElement & HTMLEmbedElement & HTMLFieldSetElement & HTMLFontElement & HTMLFormElement & HTMLFrameElement & HTMLFrameSetElement & HTMLHRElement & HTMLHeadElement & HTMLHeadingElement & HTMLHtmlElement & HTMLIFrameElement & HTMLImageElement & HTMLInputElement & HTMLLIElement & HTMLLabelElement & HTMLLegendElement & HTMLLinkElement & HTMLMapElement & HTMLMarqueeElement & HTMLMediaElement & HTMLMenuElement & HTMLMetaElement & HTMLMeterElement & HTMLModElement & HTMLOListElement & HTMLObjectElement & HTMLOptGroupElement & HTMLOptionElement & HTMLOrSVGElement & HTMLOutputElement & HTMLParagraphElement & HTMLParamElement & HTMLPictureElement & HTMLPreElement & HTMLProgressElement & HTMLQuoteElement & HTMLScriptElement & HTMLSelectElement & HTMLSlotElement & HTMLSourceElement & HTMLSpanElement & HTMLStyleElement & HTMLTableCaptionElement & HTMLTableCellElement & HTMLTableColElement & HTMLTableDataCellElement & HTMLTableElement & HTMLTableHeaderCellElement & HTMLTableRowElement & HTMLTableSectionElement & HTMLTemplateElement & HTMLTextAreaElement & HTMLTimeElement & HTMLTitleElement & HTMLTrackElement & HTMLUListElement & HTMLUnknownElement & HTMLVideoElement;
declare type Ele = Window | Document | EleHTML | Element | Node;
declare type EleLoose = Window & Document & EleHTMLLoose & Element & Node;
declare type Selector = falsy | string | Function | HTMLCollection | NodeList | Ele | Ele[] | ArrayLike<Ele> | Cash;
declare type Comparator = string | Ele | Cash | ((this: Ele, index: number, ele: Ele) => boolean);
declare type Context = Document | HTMLElement | Element;
declare type EventCallback = {
    (event: any, data?: any): any;
    guid?: number;
};
declare const doc: Document, win: Window & typeof globalThis, div: HTMLDivElement, filter: {
    <S extends any>(callbackfn: (value: any, index: number, array: any[]) => value is S, thisArg?: any): S[];
    (callbackfn: (value: any, index: number, array: any[]) => unknown, thisArg?: any): any[];
}, indexOf: (searchElement: any, fromIndex?: number) => number, map: <U>(callbackfn: (value: any, index: number, array: any[]) => U, thisArg?: any) => U[], push: (...items: any[]) => number, reverse: () => any[], slice: (start?: number, end?: number) => any[], some: (callbackfn: (value: any, index: number, array: any[]) => unknown, thisArg?: any) => boolean, splice: {
    (start: number, deleteCount?: number): any[];
    (start: number, deleteCount: number, ...items: any[]): any[];
};
declare const idRe: RegExp, classRe: RegExp, htmlRe: RegExp, tagRe: RegExp;
declare function find(selector: string, context?: Ele): ArrayLike<Element>;
declare class Cash {
    constructor(selector?: Selector, context?: Context | Cash);
    init(selector?: Selector, context?: Context | Cash): Cash;
}
declare const cash: ((selector?: Selector, context?: Element | HTMLElement | Document | Cash) => Cash) & CashStatic;
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
declare type MapCallback<T> = (this: T, index: number, ele: T) => Ele;
interface Cash {
    map(callback: MapCallback<EleLoose>): Cash;
}
interface Cash {
    slice(start?: number, end?: number): Cash;
}
declare const dashAlphaRe: RegExp;
declare function camelCaseReplace(match: string, letter: string): string;
declare function camelCase(str: string): string;
interface CashStatic {
    camelCase(str: string): string;
}
declare type EachCallback<T> = (this: T, index: number, ele: T) => any;
declare function each<T>(arr: ArrayLike<T>, callback: EachCallback<T>): void;
interface CashStatic {
    each<T>(arr: ArrayLike<T>, callback: EachCallback<T>): void;
}
interface Cash {
    each(callback: EachCallback<EleLoose>): this;
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
interface CashStatic {
    guid: number;
}
declare function matches(ele: any, selector: string): boolean;
interface CashStatic {
    matches(ele: any, selector: string): boolean;
}
declare function pluck<T>(arr: ArrayLike<T>, prop: string, deep?: boolean): Array<T>;
declare function isCash(x: any): x is Cash;
declare function isWindow(x: any): x is Window;
declare function isDocument(x: any): x is Document;
declare function isElement(x: any): x is HTMLElement;
declare function isFunction(x: any): x is Function;
declare function isString(x: any): x is string;
declare function isNumeric(x: any): boolean;
declare const isArray: (arg: any) => arg is any[];
interface CashStatic {
    isWindow(x: any): x is Window;
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
    attr(): undefined;
    attr(attrs: string): string | null;
    attr(attrs: string, value: string): this;
    attr(attrs: plainObject): this;
}
declare function attr(this: Cash): undefined;
declare function attr(this: Cash, attr: string): string | null;
declare function attr(this: Cash, attr: string, value: string): Cash;
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
declare function unique<T>(arr: ArrayLike<T>): ArrayLike<T>;
interface CashStatic {
    unique<T>(arr: ArrayLike<T>): ArrayLike<T>;
}
interface Cash {
    add(selector: Selector, context?: Context): Cash;
}
declare function computeStyle(ele: Ele, prop: string, isVariable?: boolean): string | undefined;
declare function computeStyleInt(ele: Ele, prop: string): number;
declare const cssVariableRe: RegExp;
declare function isCSSVariable(prop: string): boolean;
declare const prefixedProps: {
    [prop: string]: string;
}, style: CSSStyleDeclaration, vendorsPrefixes: string[];
declare function getPrefixedProp(prop: string, isVariable?: boolean): string;
interface CashStatic {
    prefixedProp(prop: string, isVariable?: boolean): string;
}
declare const numericProps: {
    [prop: string]: true | undefined;
};
declare function getSuffixedValue(prop: string, value: string, isVariable?: boolean): string;
interface Cash {
    css(prop: string): string | undefined;
    css(prop: string, value: string): this;
    css(props: plainObject): this;
}
declare function css(this: Cash, prop: string): string | undefined;
declare function css(this: Cash, prop: string, value: string): Cash;
declare function css(this: Cash, prop: plainObject): Cash;
declare function getData(ele: Ele, key: string): any;
declare function setData(ele: Ele, key: string, value: any): void;
declare const dataAttributeRe: RegExp;
interface Cash {
    data(): plainObject | undefined;
    data(name: string): any;
    data(name: string, value: any): this;
    data(datas: plainObject): this;
}
declare function data(this: Cash): plainObject | undefined;
declare function data(this: Cash, name: string): any;
declare function data(this: Cash, name: string, value: any): Cash;
declare function data(this: Cash, name: plainObject): Cash;
declare function getExtraSpace(ele: Element, xAxis?: boolean): number;
interface Cash {
    innerWidth(): number | undefined;
    innerHeight(): number | undefined;
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
declare const defaultDisplay: {
    [tagName: string]: string;
};
declare function getDefaultDisplay(tagName: string): string;
declare function isHidden(ele: Element): boolean;
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
    [event: string]: string | undefined;
}, eventsHover: {
    [event: string]: string | undefined;
}, eventsMouseRe: RegExp;
declare function getEventNameBubbling(name: string): string;
declare function getEventsCache(ele: Ele): {
    [event: string]: [string[], string, EventCallback][];
};
declare function addEvent(ele: Ele, name: string, namespaces: string[], selector: string, callback: EventCallback): void;
declare function parseEventName(eventName: string): [string, string[]];
declare function removeEvent(ele: Ele, name?: string, namespaces?: string[], selector?: string, callback?: EventCallback): void;
interface Cash {
    off(): this;
    off(events: string): this;
    off(events: string, callback: EventCallback): this;
    off(events: string, selector: string, callback: EventCallback): this;
}
interface Cash {
    on(events: plainObject): this;
    on(events: string, callback: EventCallback, _one?: boolean): this;
    on(events: string, selector: string | EventCallback, callback: EventCallback, _one?: boolean): this;
}
declare function on(this: Cash, eventFullName: plainObject): Cash;
declare function on(this: Cash, eventFullName: string, callback: EventCallback, _one?: boolean): Cash;
declare function on(this: Cash, eventFullName: string, selector: string | EventCallback, callback: EventCallback, _one?: boolean): Cash;
interface Cash {
    one(events: plainObject): this;
    one(events: string, callback: EventCallback): this;
    one(events: string, selector: string | EventCallback, callback: EventCallback): this;
}
declare function one(this: Cash, eventFullName: plainObject): Cash;
declare function one(this: Cash, eventFullName: string, callback: EventCallback): Cash;
declare function one(this: Cash, eventFullName: string, selector: string | EventCallback, callback: EventCallback): Cash;
interface Cash {
    ready(callback: Function): this;
}
interface Cash {
    trigger(event: Event | string, data?: any): this;
}
declare function getValue(ele: Ele): string | string[];
declare const queryEncodeSpaceRe: RegExp;
declare function queryEncode(prop: string, value: string): string;
declare const skippableRe: RegExp, checkableRe: RegExp;
interface Cash {
    serialize(): string;
}
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
declare function insertElement(anchor: Ele, child: Ele, prepend?: boolean, prependTarget?: Element): void;
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
