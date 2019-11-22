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
interface CashStatic {
    camelCase(str: string): string;
}
declare type EachCallback<T> = (this: T, index: number, ele: T) => any;
interface CashStatic {
    each<T>(arr: ArrayLike<T>, callback: EachCallback<T>): void;
}
interface Cash {
    each(callback: EachCallback<EleLoose>): this;
}
interface Cash {
    removeProp(prop: string): this;
}
interface Cash {
    extend(plugins: plainObject): this;
}
interface CashStatic {
    extend(target: any, ...objs: any[]): any;
}
interface CashStatic {
    guid: number;
}
interface CashStatic {
    matches(ele: any, selector: string): boolean;
}
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
interface Cash {
    filter(comparator: Comparator): Cash;
}
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
interface Cash {
    toggleClass(classes: string, force?: boolean): this;
}
interface Cash {
    addClass(classes: string): this;
}
interface Cash {
    removeClass(classes?: string): this;
}
interface CashStatic {
    unique<T>(arr: ArrayLike<T>): ArrayLike<T>;
}
interface Cash {
    add(selector: Selector, context?: Context): Cash;
}
interface CashStatic {
    prefixedProp(prop: string, isVariable?: boolean): string;
}
interface Cash {
    css(prop: string): string | undefined;
    css(prop: string, value: string): this;
    css(props: plainObject): this;
}
interface Cash {
    data(): plainObject | undefined;
    data(name: string): any;
    data(name: string, value: any): this;
    data(datas: plainObject): this;
}
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
interface Cash {
    toggle(force?: boolean): this;
}
interface Cash {
    hide(): this;
}
interface Cash {
    show(): this;
}
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
interface Cash {
    one(events: plainObject): this;
    one(events: string, callback: EventCallback): this;
    one(events: string, selector: string | EventCallback, callback: EventCallback): this;
}
interface Cash {
    ready(callback: Function): this;
}
interface Cash {
    trigger(event: Event | string, data?: any): this;
}
interface Cash {
    serialize(): string;
}
interface Cash {
    val(): string | string[];
    val(value: string | string[]): this;
}
interface Cash {
    clone(): this;
}
interface Cash {
    detach(): this;
}
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
interface Cash {
    remove(): this;
}
interface Cash {
    text(): string;
    text(text: string): this;
}
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
export default cash;
export { Cash, CashStatic, Ele as Element, Selector, Comparator, Context };
