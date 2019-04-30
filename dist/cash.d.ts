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
interface CashStatic {
    camelCase(str: string): string;
}
interface CashStatic {
    each(arr: ArrayLike<any>, callback: Function): void;
}
interface Cash {
    each(callback: Function): this;
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
    matches(ele: HTMLElement, selector: string): boolean;
}
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
    attr(attrs: string): any;
    attr(attrs: string, value: any): this;
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
    unique(arr: ArrayLike<any>): ArrayLike<any>;
}
interface Cash {
    add(selector: Selector, context?: Context): Cash;
}
interface CashStatic {
    prefixedProp(prop: string, isVariable?: boolean): string;
}
interface Cash {
    css(prop: string): any;
    css(prop: string, value: any): this;
    css(props: plainObject): this;
}
interface CashStatic {
    hasData(ele: HTMLElement): boolean;
}
interface Cash {
    data(name: string): any;
    data(name: string, value: any): this;
    data(datas: plainObject): this;
}
interface Cash {
    removeData(key: string): this;
}
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
    off(events: string, callback: Function): this;
    off(events: string, selector: string, callback: Function): this;
}
interface Cash {
    on(events: plainObject): this;
    on(events: string, callback: Function, _one?: boolean): this;
    on(events: string, selector: string | Function, callback: Function, _one?: boolean): this;
}
interface Cash {
    one(events: plainObject): this;
    one(events: string, callback: Function): this;
    one(events: string, selector: string | Function, callback: Function): this;
}
interface Cash {
    ready(callback: Function): this;
}
interface Cash {
    trigger(event: string | Event, data?: any): this;
}
interface Cash {
    serialize(): string;
}
interface Cash {
    val(): string | string[];
    val(value: any): this;
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
