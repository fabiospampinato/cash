
interface Event {
  namespace: string,
  data: any,
  ___cd?: boolean // Delegate
}

interface Cash {
  [index: number]: EleLoose | undefined,
  length: number,
  splice ( start: number, deleteCount?: number ): EleLoose[],
  splice ( start: number, deleteCount: number, ...items: Ele[] ): EleLoose[]
}

interface CashStatic {
  fn: Cash
}

type falsy = undefined | null | false | 0 | '';

type EleHTML = HTMLElement | HTMLAnchorElement | HTMLAppletElement | HTMLAreaElement | HTMLAudioElement | HTMLBRElement | HTMLBaseElement | HTMLBaseFontElement | HTMLBodyElement | HTMLButtonElement | HTMLCanvasElement | HTMLDListElement | HTMLDataElement | HTMLDataListElement | HTMLDetailsElement | HTMLDialogElement | HTMLDirectoryElement | HTMLDivElement | HTMLEmbedElement | HTMLFieldSetElement | HTMLFontElement | HTMLFormElement | HTMLFrameElement | HTMLFrameSetElement | HTMLHRElement | HTMLHeadElement | HTMLHeadingElement | HTMLHtmlElement | HTMLIFrameElement | HTMLImageElement | HTMLInputElement | HTMLLIElement | HTMLLabelElement | HTMLLegendElement | HTMLLinkElement | HTMLMapElement | HTMLMarqueeElement | HTMLMediaElement | HTMLMenuElement | HTMLMetaElement | HTMLMeterElement | HTMLModElement | HTMLOListElement | HTMLObjectElement | HTMLOptGroupElement | HTMLOptionElement | HTMLOrSVGElement | HTMLOutputElement | HTMLParagraphElement | HTMLParamElement | HTMLPictureElement | HTMLPreElement | HTMLProgressElement | HTMLQuoteElement | HTMLScriptElement | HTMLSelectElement | HTMLSlotElement | HTMLSourceElement | HTMLSpanElement | HTMLStyleElement | HTMLTableCaptionElement | HTMLTableCellElement | HTMLTableColElement | HTMLTableDataCellElement | HTMLTableElement | HTMLTableHeaderCellElement | HTMLTableRowElement | HTMLTableSectionElement | HTMLTemplateElement | HTMLTextAreaElement | HTMLTimeElement | HTMLTitleElement | HTMLTrackElement | HTMLUListElement | HTMLUnknownElement | HTMLVideoElement;
type EleHTMLLoose = HTMLElement & HTMLAnchorElement & HTMLAppletElement & HTMLAreaElement & HTMLAudioElement & HTMLBRElement & HTMLBaseElement & HTMLBaseFontElement & HTMLBodyElement & HTMLButtonElement & HTMLCanvasElement & HTMLDListElement & HTMLDataElement & HTMLDataListElement & HTMLDetailsElement & HTMLDialogElement & HTMLDirectoryElement & HTMLDivElement & HTMLEmbedElement & HTMLFieldSetElement & HTMLFontElement & HTMLFormElement & HTMLFrameElement & HTMLFrameSetElement & HTMLHRElement & HTMLHeadElement & HTMLHeadingElement & HTMLHtmlElement & HTMLIFrameElement & HTMLImageElement & HTMLInputElement & HTMLLIElement & HTMLLabelElement & HTMLLegendElement & HTMLLinkElement & HTMLMapElement & HTMLMarqueeElement & HTMLMediaElement & HTMLMenuElement & HTMLMetaElement & HTMLMeterElement & HTMLModElement & HTMLOListElement & HTMLObjectElement & HTMLOptGroupElement & HTMLOptionElement & HTMLOrSVGElement & HTMLOutputElement & HTMLParagraphElement & HTMLParamElement & HTMLPictureElement & HTMLPreElement & HTMLProgressElement & HTMLQuoteElement & HTMLScriptElement & HTMLSelectElement & HTMLSlotElement & HTMLSourceElement & HTMLSpanElement & HTMLStyleElement & HTMLTableCaptionElement & HTMLTableCellElement & HTMLTableColElement & HTMLTableDataCellElement & HTMLTableElement & HTMLTableHeaderCellElement & HTMLTableRowElement & HTMLTableSectionElement & HTMLTemplateElement & HTMLTextAreaElement & HTMLTimeElement & HTMLTitleElement & HTMLTrackElement & HTMLUListElement & HTMLUnknownElement & HTMLVideoElement;
type Ele = Window | Document | EleHTML | Element | Node;
type EleLoose = Window & Document & EleHTMLLoose & Element & Node; //UGLY: Trick to remove some kind-of useless type errors //URL: https://github.com/kenwheeler/cash/issues/278
type Selector = falsy | string | Function | HTMLCollection | NodeList | Ele | Ele[] | ArrayLike<Ele> | Cash;
type Comparator = string | Ele | Cash | (( this: EleLoose, index: number, ele: EleLoose ) => boolean);
type Context = Document | EleHTML | Element;

type EventCallback = {
  ( event: any, data?: any ): any,
  guid?: number
};


const doc = document,
      win = window,
      docEle = doc.documentElement,
      createElement = doc.createElement.bind ( doc ),
      div = createElement ( 'div' ),
      table = createElement ( 'table' ),
      tbody = createElement ( 'tbody' ),
      tr = createElement ( 'tr' ),
      {isArray, prototype: ArrayProtoType} = Array,
      {filter, indexOf, map, push, slice, some, splice} = ArrayProtoType;

const idRe = /^#[\w-]*$/,
      classRe = /^\.[\w-]*$/,
      htmlRe = /<.+>/,
      tagRe = /^\w+$/;


// @require ./variables.ts

function find ( selector: string, context: Ele = doc ): ArrayLike<Element> {

  return !isDocument ( context ) && !isElement ( context )
           ? []
           : classRe.test ( selector )
             ? context.getElementsByClassName ( selector.slice ( 1 ) )
             : tagRe.test ( selector )
               ? context.getElementsByTagName ( selector )
               : context.querySelectorAll ( selector );

}


// @require ./find.ts
// @require ./variables.ts

class Cash {

  constructor ( selector?: Selector, context: Context | Cash = doc ) {

    if ( !selector ) return;

    if ( isCash ( selector ) ) return selector;

    let eles: any = selector;

    if ( isString ( selector ) ) {

      const ctx = isCash ( context ) ? context[0] : context;

      eles = idRe.test ( selector )
                ? ( ctx as Document ).getElementById ( selector.slice ( 1 ) )
                : htmlRe.test ( selector )
                  ? parseHTML ( selector )
                  : find ( selector, ctx );

      if ( !eles ) return;

    } else if ( isFunction ( selector ) ) {

      return this.ready ( selector ); //FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality

    }

    if ( eles.nodeType || eles === win ) eles = [eles];

    this.length = eles.length;

    for ( let i = 0, l = this.length; i < l; i++ ) {

      this[i] = eles[i];

    }

  }

  init ( selector?: Selector, context?: Context | Cash ) {

    return new Cash ( selector, context );

  }

}

const fn = Cash.prototype,
      cash = fn.init as typeof Cash.prototype.init & CashStatic;

cash.fn = cash.prototype = fn; // Ensuring that `cash () instanceof cash`

fn.length = 0;
fn.splice = splice; // Ensuring a cash collection gets printed as array-like in Chrome's devtools

if ( typeof Symbol === 'function' ) { // Ensuring a cash collection is iterable
  fn[Symbol['iterator']] = ArrayProtoType[Symbol['iterator']];
}


// @require core/cash.ts
// @require core/variables.ts

type MapCallback<T> = ( this: T, index: number, ele: T ) => Ele;

interface Cash {
  map ( callback: MapCallback<EleLoose> ): Cash;
}

fn.map = function ( this: Cash, callback: MapCallback<EleLoose> ) {

  return cash ( map.call ( this, ( ele: EleLoose, i: number ) => callback.call ( ele, i, ele ) ) );

};


// @require core/cash.ts
// @require core/variables.ts

interface Cash {
  slice ( start?: number, end?: number ): Cash;
}

fn.slice = function ( this: Cash, start?: number, end?: number ) {

  return cash ( slice.call ( this, start, end ) );

};


// @require ./cash.ts

interface CashStatic {
  camelCase ( str: string ): string;
}

const dashAlphaRe = /-([a-z])/g;

function camelCase ( str: string ): string {

  return str.replace ( dashAlphaRe, ( match: string, letter: string ) => letter.toUpperCase () );

}

cash.camelCase = camelCase;


// @require ./cash.ts

type EachCallback<T> = ( this: T, index: number, ele: T ) => any;

interface CashStatic {
  each<T> ( arr: ArrayLike<T>, callback: EachCallback<T> ): void;
}

function each<T, U extends ArrayLike<T> = ArrayLike<T>> ( arr: U, callback: EachCallback<U[0]>, reverse?: boolean ): U {

  if ( reverse ) {

    let i = arr.length;

    while ( i-- ) {

      if ( callback.call ( arr[i], i, arr[i] ) === false ) return arr;

    }

  } else {

    for ( let i = 0, l = arr.length; i < l; i++ ) {

      if ( callback.call ( arr[i], i, arr[i] ) === false ) return arr;

    }

  }

  return arr;

}

cash.each = each;


// @require core/cash.ts
// @require core/each.ts

interface Cash {
  each ( callback: EachCallback<EleLoose> ): this;
}

fn.each = function ( this: Cash, callback: EachCallback<EleLoose> ) {

  return each ( this, callback );

};


// @require core/cash.ts
// @require collection/each.ts

interface Cash {
  removeProp ( prop: string ): this;
}

fn.removeProp = function ( this: Cash, prop: string ) {

  return this.each ( ( i, ele ) => { delete ele[prop] } );

};


// @require ./cash.ts

interface CashStatic {
  extend ( target: any, ...objs: any[] ): any;
}

interface Cash {
  extend ( plugins: Record<any, any> ): this;
}

cash.extend = function ( target: any, ...objs: any[] ) {

  const length = arguments.length;

  for ( let i = ( length < 2 ? 0 : 1 ); i < length; i++ ) {

    for ( const key in arguments[i] ) {

      target[key] = arguments[i][key];

    }

  }

  return target;

};

fn.extend = function ( plugins: Record<string, any> ) {

  return cash.extend ( fn, plugins );

};


// @require ./cash.ts

interface CashStatic {
  guid: number;
}

cash.guid = 1;


// @require ./cash.ts

interface CashStatic {
  matches ( ele: any, selector: string ): boolean;
}

function matches ( ele: any, selector: string ): boolean {

  const matches = ele && ( ele['matches'] || ele['webkitMatchesSelector'] || ele['msMatchesSelector'] );

  return !!matches && matches.call ( ele, selector );

}

cash.matches = matches;


// @require ./cash.ts
// @require ./variables.ts

interface CashStatic {
  isWindow ( x: any ): x is Window;
  isFunction ( x: any ): x is Function;
  isString ( x: any ): x is string;
  isNumeric ( x: any ): boolean;
  isArray ( x: any ): x is Array<any>;
}

function isCash ( x: any ): x is Cash {

  return x instanceof Cash;

}

function isWindow ( x: any ): x is Window {

  return !!x && x === x.window;

}

function isDocument ( x: any ): x is Document {

  return !!x && x.nodeType === 9;

}

function isElement ( x: any ): x is HTMLElement {

  return !!x && x.nodeType === 1;

}

function isFunction ( x: any ): x is Function {

  return typeof x === 'function';

}

function isString ( x: any ): x is string {

  return typeof x === 'string';

}

function isUndefined ( x: any ): x is undefined {

  return x === undefined;

}

function isNull ( x: any ): x is null {

  return x === null;

}

function isNumeric ( x: any ): boolean {

  return !isNaN ( parseFloat ( x ) ) && isFinite ( x );

}

cash.isWindow = isWindow;
cash.isFunction = isFunction;
cash.isString = isString;
cash.isNumeric = isNumeric;
cash.isArray = isArray;


// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts

interface Cash {
  prop ( prop: string ): any;
  prop ( prop: string, value: any ): this;
  prop ( props: Record<string, any> ): this;
}

fn.prop = function ( this: Cash, prop: string | Record<string, any>, value?: any ) {

  if ( !prop ) return;

  if ( isString ( prop ) ) {

    if ( arguments.length < 2 ) return this[0] && this[0][prop];

    return this.each ( ( i, ele ) => { ele[prop] = value } );

  }

  for ( const key in prop ) {

    this.prop ( key, prop[key] );

  }

  return this;

};


// @require core/cash.ts
// @require core/type_checking.ts
// @require core/variables.ts

interface Cash {
  get (): EleLoose[];
  get ( index: number ): EleLoose | undefined;
}

fn.get = function ( this: Cash, index?: number ) {

  if ( isUndefined ( index ) ) return slice.call ( this );

  return this[index < 0 ? index + this.length : index];

};


// @require core/cash.ts
// @require ./get.ts

interface Cash {
  eq ( index: number ): Cash;
}

fn.eq = function ( this: Cash, index: number ) {

  return cash ( this.get ( index ) );

};


// @require core/cash.ts
// @require ./eq.ts

interface Cash {
  first (): Cash;
}

fn.first = function ( this: Cash ) {

  return this.eq ( 0 );

};


// @require core/cash.ts
// @require ./eq.ts

interface Cash {
  last (): Cash;
}

fn.last = function ( this: Cash ) {

  return this.eq ( -1 );

};


// @require ./matches.ts
// @require ./type_checking.ts

function getCompareFunction ( comparator?: Comparator ): (( i: number, ele: EleLoose ) => boolean) {

  return isString ( comparator )
           ? ( i: number, ele: EleLoose ) => matches ( ele, comparator )
           : isFunction ( comparator )
             ? comparator
             : isCash ( comparator )
               ? ( i: number, ele: EleLoose ) => comparator.is ( ele )
               : !comparator
                 ? () => false
                 : ( i: number, ele: EleLoose ) => ele === comparator;

}


// @require core/cash.ts
// @require core/get_compare_function.ts
// @require core/type_checking.ts
// @require core/variables.ts
// @require collection/get.ts

interface Cash {
  filter ( comparator?: Comparator ): Cash;
}

fn.filter = function ( this: Cash, comparator?: Comparator ) {

  const compare = getCompareFunction ( comparator );

  return cash ( filter.call ( this, ( ele: EleLoose, i: number ) => compare.call ( ele, i, ele ) ) );

};


// @require collection/filter.ts

function filtered ( collection: Cash, comparator?: Comparator ): Cash {

  return !comparator ? collection : collection.filter ( comparator );

}


// @require ./type_checking.ts

const splitValuesRe = /\S+/g;

function getSplitValues ( str: string ) {

  return isString ( str ) ? str.match ( splitValuesRe ) || [] : [];

}


// @require core/cash.ts
// @require core/get_split_values.ts
// @require collection/each.ts

interface Cash {
  hasClass ( cls: string ): boolean;
}

fn.hasClass = function ( this: Cash, cls: string ) {

  return !!cls && some.call ( this, ( ele: EleLoose ) => ele.classList.contains ( cls ) );

};


// @require core/cash.ts
// @require core/get_split_values.ts
// @require collection/each.ts

interface Cash {
  removeAttr ( attrs: string ): this;
}

fn.removeAttr = function ( this: Cash, attr: string ) {

  const attrs = getSplitValues ( attr );

  return this.each ( ( i, ele ) => {

    each ( attrs, ( i, a ) => {

      ele.removeAttribute ( a );

    });

  });

};


// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./remove_attr.ts

interface Cash {
  attr (): undefined;
  attr ( attrs: string ): string | null;
  attr ( attrs: string, value: string ): this;
  attr ( attrs: Record<string, string> ): this;
}

function attr ( this: Cash ): undefined;
function attr ( this: Cash, attr: string ): string | null;
function attr ( this: Cash, attr: string, value: string ): Cash;
function attr ( this: Cash, attr: Record<string, string> ): Cash;
function attr ( this: Cash, attr?: string | Record<string, string>, value?: string ) {

  if ( !attr ) return;

  if ( isString ( attr ) ) {

    if ( arguments.length < 2 ) {

      if ( !this[0] ) return;

      const value = this[0].getAttribute ( attr );

      return isNull ( value ) ? undefined : value;

    }

    if ( isUndefined ( value ) ) return this;

    if ( isNull ( value ) ) return this.removeAttr ( attr );

    return this.each ( ( i, ele ) => { ele.setAttribute ( attr, value ) } );

  }

  for ( const key in attr ) {

    this.attr ( key, attr[key] );

  }

  return this;

}

fn.attr = attr;


// @require core/cash.ts
// @require core/each.ts
// @require core/get_split_values.ts
// @require core/type_checking.ts
// @require collection/each.ts

interface Cash {
  toggleClass ( classes: string, force?: boolean ): this;
}

fn.toggleClass = function ( this: Cash, cls: string, force?: boolean ) {

  const classes = getSplitValues ( cls ),
        isForce = !isUndefined ( force );

  return this.each ( ( i, ele ) => {

    each ( classes, ( i, c ) => {

      if ( isForce ) {

        force ? ele.classList.add ( c ) : ele.classList.remove ( c );

      } else {

        ele.classList.toggle ( c );

      }

    });

  });

};


// @require core/cash.ts
// @require ./toggle_class.ts

interface Cash {
  addClass ( classes: string ): this;
}

fn.addClass = function ( this: Cash, cls: string ) {

  return this.toggleClass ( cls, true );

};


// @require core/cash.ts
// @require ./attr.ts
// @require ./toggle_class.ts

interface Cash {
  removeClass ( classes?: string ): this;
}

fn.removeClass = function ( this: Cash, cls?: string ) {

  if ( arguments.length ) return this.toggleClass ( cls, false );

  return this.attr ( 'class', '' );

};


// @optional ./add_class.ts
// @optional ./attr.ts
// @optional ./has_class.ts
// @optional ./prop.ts
// @optional ./remove_attr.ts
// @optional ./remove_class.ts
// @optional ./remove_prop.ts
// @optional ./toggle_class.ts


// @require ./type_checking.ts
// @require ./variables.ts

type PluckCallback<T> = ( ele: T ) => ArrayLike<Ele>;

function pluck<T, U extends ArrayLike<T> = ArrayLike<T>> ( arr: U, prop: PluckCallback<U[0]> ): Array<Ele>;
function pluck<T, U extends ArrayLike<T> = ArrayLike<T>> ( arr: U, prop: string, deep?: boolean ): Array<Ele>;
function pluck<T, U extends ArrayLike<T> = ArrayLike<T>> ( arr: U, prop: string | PluckCallback<U[0]>, deep?: boolean ): Array<Ele> {

  const plucked: Array<Ele> = [],
        isCallback = isFunction ( prop );

  for ( let i = 0, l = arr.length; i < l; i++ ) {

    if ( isCallback ) {

      const val = prop ( arr[i] );

      if ( val.length ) push.apply ( plucked, val );

    } else {

      let val = arr[i][prop];

      while ( val != null ) {

        plucked.push ( val );

        val = deep ? val[prop] : null;

      }

    }

  }

  return plucked;

}


// @require ./cash.ts
// @require ./variables.ts

interface CashStatic {
  unique<T> ( arr: ArrayLike<T> ): ArrayLike<T>;
}

function unique<T> ( arr: ArrayLike<T> ): ArrayLike<T> {

  return arr.length > 1 ? filter.call ( arr, ( item: T, index: number, self: ArrayLike<T> ) => indexOf.call ( self, item ) === index ) : arr;

}

cash.unique = unique;


// @require core/cash.ts
// @require core/unique.ts
// @require ./get.ts

interface Cash {
  add ( selector: Selector, context?: Context ): Cash;
}

fn.add = function ( this: Cash, selector: Selector, context?: Context ) {

  return cash ( unique ( this.get ().concat ( cash ( selector, context ).get () ) ) );

};


// @require core/type_checking.ts
// @require core/variables.ts

function computeStyle ( ele: EleLoose, prop: string, isVariable?: boolean ): string | undefined {

  if ( !isElement ( ele ) || !prop ) return;

  const style = win.getComputedStyle ( ele, null );

  return prop ? ( isVariable ? style.getPropertyValue ( prop ) || undefined : style[prop] ) : style;

}


// @require ./compute_style.ts

function computeStyleInt ( ele: EleLoose, prop: string ): number {

  return parseInt ( computeStyle ( ele, prop ), 10 ) || 0;

}


const cssVariableRe = /^--/;


// @require ./variables.ts

function isCSSVariable ( prop: string ): boolean {

  return cssVariableRe.test ( prop );

}


// @require core/camel_case.ts
// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts
// @require ./is_css_variable.ts

interface CashStatic {
  prefixedProp ( prop: string, isVariable?: boolean ): string;
}

const prefixedProps: { [prop: string]: string } = {},
      {style} = div,
      vendorsPrefixes = ['webkit', 'moz', 'ms'];

function getPrefixedProp ( prop: string, isVariable: boolean = isCSSVariable ( prop ) ): string {

  if ( isVariable ) return prop;

  if ( !prefixedProps[prop] ) {

    const propCC = camelCase ( prop ),
          propUC = `${propCC[0].toUpperCase ()}${propCC.slice ( 1 )}`,
          props = ( `${propCC} ${vendorsPrefixes.join ( `${propUC} ` )}${propUC}` ).split ( ' ' );

    each ( props, ( i, p ) => {

      if ( p in style ) {

        prefixedProps[prop] = p;

        return false;

      }

    });

  }

  return prefixedProps[prop];

};

cash.prefixedProp = getPrefixedProp;


// @require core/type_checking.ts
// @require ./is_css_variable.ts

const numericProps: { [prop: string]: true | undefined } = {
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

function getSuffixedValue ( prop: string, value: number | string, isVariable: boolean = isCSSVariable ( prop ) ): string {

  return !isVariable && !numericProps[prop] && isNumeric ( value ) ? `${value}px` : value;

}


// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/compute_style.ts
// @require ./helpers/get_prefixed_prop.ts
// @require ./helpers/get_suffixed_value.ts
// @require ./helpers/is_css_variable.ts

interface Cash {
  css ( prop: string ): string | undefined;
  css ( prop: string, value: number | string ): this;
  css ( props: Record<string, number | string> ): this;
}

function css ( this: Cash, prop: string ): string | undefined;
function css ( this: Cash, prop: string, value: number | string ): Cash;
function css ( this: Cash, prop: Record<string, number | string> ): Cash;
function css ( this: Cash, prop: string | Record<string, number | string>, value?: number | string ) {

  if ( isString ( prop ) ) {

    const isVariable = isCSSVariable ( prop );

    prop = getPrefixedProp ( prop, isVariable );

    if ( arguments.length < 2 ) return this[0] && computeStyle ( this[0], prop, isVariable );

    if ( !prop ) return this;

    value = getSuffixedValue ( prop, value, isVariable );

    return this.each ( ( i, ele ) => {

      if ( !isElement ( ele ) ) return;

      if ( isVariable ) {

        ele.style.setProperty ( prop, value );

      } else {

        ele.style[prop] = value;

      }

    });

  }

  for ( const key in prop ) {

    this.css ( key, prop[key] );

  }

  return this;

};

fn.css = css;


// @optional ./css.ts


// @require core/camel_case.ts

function getData ( ele: EleLoose, key: string ): any {

  const value = ele.dataset[key] || ele.dataset[camelCase ( key )];

  try {

    return JSON.parse ( value );

  } catch {}

  return value;

}


// @require core/camel_case.ts

function setData ( ele: EleLoose, key: string, value: any ): void {

  try {

    value = JSON.stringify ( value );

  } catch {}

  ele.dataset[camelCase ( key )] = value;

}


// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/get_data.ts
// @require ./helpers/set_data.ts

interface Cash {
  data (): Record<string, any> | undefined;
  data ( name: string ): any;
  data ( name: string, value: any ): this;
  data ( datas: Record<string, any> ): this;
}

function data ( this: Cash ): Record<string, any> | undefined;
function data ( this: Cash, name: string ): any;
function data ( this: Cash, name: string, value: any ): Cash;
function data ( this: Cash, name: Record<string, any> ): Cash;
function data ( this: Cash, name?: string | Record<string, any>, value?: any ) {

  if ( !name ) {

    if ( !this[0] ) return;

    const datas: { [data: string]: any } = {};

    for ( const key in this[0].dataset ) {

      datas[key] = getData ( this[0], key );

    }

    return datas;

  }

  if ( isString ( name ) ) {

    if ( arguments.length < 2 ) return this[0] && getData ( this[0], name );

    return this.each ( ( i, ele ) => { setData ( ele, name, value ) } );

  }

  for ( const key in name ) {

    this.data ( key, name[key] );

  }

  return this;

}

fn.data = data;


// @optional ./data.ts


// @require css/helpers/compute_style_int.ts

function getExtraSpace ( ele: EleLoose, xAxis?: boolean ): number {

  return computeStyleInt ( ele, `border${ xAxis ? 'Left' : 'Top' }Width` ) + computeStyleInt ( ele, `padding${ xAxis ? 'Left' : 'Top' }` ) + computeStyleInt ( ele, `padding${ xAxis ? 'Right' : 'Bottom' }` ) + computeStyleInt ( ele, `border${ xAxis ? 'Right' : 'Bottom' }Width` );

}


// @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require core/variables.ts

interface Cash {
  innerWidth (): number | undefined;
  innerHeight (): number | undefined;
  outerWidth ( includeMargins?: boolean ): number;
  outerHeight ( includeMargins?: boolean ): number;
}

each ( [true, false], ( i, outer?: boolean ) => {

  each ( ['Width', 'Height'], ( i, prop: 'Width' | 'Height' ) => {

    const name: 'outerWidth' | 'innerHeight' = `${outer ? 'outer' : 'inner'}${prop}`;

    fn[name] = function ( this: Cash, includeMargins?: boolean ) {

      if ( !this[0] ) return;

      if ( isWindow ( this[0] ) ) return win[name];

      return this[0][`${outer ? 'offset' : 'client'}${prop}`] + ( includeMargins && outer ? computeStyleInt ( this[0], `margin${ i ? 'Top' : 'Left' }` ) + computeStyleInt ( this[0], `margin${ i ? 'Bottom' : 'Right' }` ) : 0 );

    };

  });

});


// @require core/camel_case.ts
// @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require core/variables.ts
// @require css/helpers/compute_style.ts
// @require css/helpers/get_suffixed_value.ts
// @require ./helpers/get_extra_space.ts

interface Cash {
  width (): number;
  width ( value: number | string ): this;
  height (): number;
  height ( value: number | string ): this;
}

each ( ['width', 'height'], ( index: number, prop: 'width' | 'height' ) => {

  fn[prop] = function ( this: Cash, value?: number | string ) {

    if ( !this[0] ) return isUndefined ( value ) ? undefined : this;

    if ( !arguments.length ) {

      if ( isWindow ( this[0] ) ) return this[0][ camelCase ( `outer-${prop}` )];

      return this[0].getBoundingClientRect ()[prop] - getExtraSpace ( this[0], !index );

    }

    const valueNumber = parseInt ( value, 10 );

    return this.each ( ( i, ele ) => {

      if ( !isElement ( ele ) ) return;

      const boxSizing = computeStyle ( ele, 'boxSizing' );

      ele.style[prop] = getSuffixedValue ( prop, valueNumber + ( boxSizing === 'border-box' ? getExtraSpace ( ele, !index ) : 0 ) );

    });

  };

});


// @optional ./inner_outer.ts
// @optional ./normal.ts


// @require css/helpers/compute_style.ts

const defaultDisplay: { [tagName: string]: string } = {};

function getDefaultDisplay ( tagName: string ): string {

  if ( defaultDisplay[tagName] ) return defaultDisplay[tagName];

  const ele = createElement ( tagName );

  doc.body.insertBefore ( ele, null );

  const display = computeStyle ( ele, 'display' );

  doc.body.removeChild ( ele );

  return defaultDisplay[tagName] = display !== 'none' ? display : 'block';

}


// @require css/helpers/compute_style.ts

function isHidden ( ele: EleLoose ): boolean {

  return computeStyle ( ele, 'display' ) === 'none';

}


const displayProperty = '___cd';


// @require core/cash.ts
// @require core/type_checking.ts
// @require css/helpers/compute_style.ts
// @require ./helpers/get_default_display.ts
// @require ./helpers/variables.ts

interface Cash {
  toggle ( force?: boolean ): this;
}

fn.toggle = function ( this: Cash, force?: boolean ) {

  return this.each ( ( i, ele ) => {

    const show = isUndefined ( force ) ? isHidden ( ele ) : force;

    if ( show ) {

      ele.style.display = ele[displayProperty] || '';

      if ( isHidden ( ele ) ) {

        ele.style.display = getDefaultDisplay ( ele.tagName );

      }

    } else {

      ele[displayProperty] = computeStyle ( ele, 'display' );

      ele.style.display = 'none';

    }

  });

};


// @require core/cash.ts
// @require ./toggle.ts

interface Cash {
  hide (): this;
}

fn.hide = function ( this: Cash ) {

  return this.toggle ( false );

};


// @require core/cash.ts
// @require ./toggle.ts

interface Cash {
  show (): this;
}

fn.show = function ( this: Cash ) {

  return this.toggle ( true );

};


// @optional ./hide.ts
// @optional ./show.ts
// @optional ./toggle.ts


function hasNamespaces ( ns1: string[], ns2?: string[] ): boolean {

  return !ns2 || !some.call ( ns2, ( ns: string ) => ns1.indexOf ( ns ) < 0 );

}


const eventsNamespace = '___ce',
      eventsNamespacesSeparator = '.',
      eventsFocus: { [event: string]: string | undefined } = { focus: 'focusin', blur: 'focusout' },
      eventsHover: { [event: string]: string | undefined } = { mouseenter: 'mouseover', mouseleave: 'mouseout' },
      eventsMouseRe = /^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;


// @require ./variables.ts

function getEventNameBubbling ( name: string ): string {

  return eventsHover[name] || eventsFocus[name] || name;

}


// @require ./variables.ts

function getEventsCache ( ele: EleLoose ): { [event: string]: [string[], string, EventCallback][] } {

  return ele[eventsNamespace] = ( ele[eventsNamespace] || {} );

}


// @require core/guid.ts
// @require events/helpers/get_events_cache.ts

function addEvent ( ele: EleLoose, name: string, namespaces: string[], selector: string, callback: EventCallback ): void {

  callback.guid = callback.guid || cash.guid++;

  const eventCache = getEventsCache ( ele );

  eventCache[name] = ( eventCache[name] || [] );
  eventCache[name].push ([ namespaces, selector, callback ]);

  ele.addEventListener ( name, callback );

}


// @require ./variables.ts

function parseEventName ( eventName: string ): [string, string[]] {

  const parts = eventName.split ( eventsNamespacesSeparator );

  return [parts[0], parts.slice ( 1 ).sort ()]; // [name, namespace[]]

}


// @require ./get_events_cache.ts
// @require ./has_namespaces.ts
// @require ./parse_event_name.ts

function removeEvent ( ele: EleLoose, name?: string, namespaces?: string[], selector?: string, callback?: EventCallback ): void {

  const cache = getEventsCache ( ele );

  if ( !name ) {

    for ( name in cache ) {

      removeEvent ( ele, name, namespaces, selector, callback );

    }

  } else if ( cache[name] ) {

    cache[name] = cache[name].filter ( ([ ns, sel, cb ]) => {

      if ( ( callback && cb.guid !== callback.guid ) || !hasNamespaces ( ns, namespaces ) || ( selector && selector !== sel ) ) return true;

      ele.removeEventListener ( name, cb );

    });

  }

}


// @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/get_event_name_bubbling.ts
// @require ./helpers/parse_event_name.ts
// @require ./helpers/remove_event.ts

interface Cash {
  off (): this;
  off ( events: string ): this;
  off ( events: Record<string, EventCallback> ): this;
  off ( events: string, callback: EventCallback ): this;
  off ( events: string, selector: string, callback: EventCallback ): this;
}

fn.off = function ( this: Cash, eventFullName?: string | Record<string, EventCallback>, selector?: string | EventCallback, callback?: EventCallback ) {

  if ( isUndefined ( eventFullName ) ) {

    this.each ( ( i, ele ) => { removeEvent ( ele ) } );

  } else if ( !isString ( eventFullName ) ) {

    for ( const key in eventFullName ) {

      this.off ( key, eventFullName[key] );

    }

  } else {

    if ( isFunction ( selector ) ) {

      callback = selector;
      selector = '';

    }

    each ( getSplitValues ( eventFullName ), ( i, eventFullName ) => {

      const [name, namespaces] = parseEventName ( getEventNameBubbling ( eventFullName ) );

      this.each ( ( i, ele ) => { removeEvent ( ele, name, namespaces, selector, callback ) } );

    });

  }

  return this;

};


// @require core/cash.ts
// @require core/get_split_values.ts
// @require core/guid.ts
// @require core/matches.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/variables.ts
// @require ./helpers/add_event.ts
// @require ./helpers/get_event_name_bubbling.ts
// @require ./helpers/has_namespaces.ts
// @require ./helpers/parse_event_name.ts
// @require ./helpers/remove_event.ts

interface Cash {
  on ( events: Record<string, EventCallback> ): this;
  on ( events: string, callback: EventCallback, _one?: boolean ): this;
  on ( events: string, selector: string | EventCallback, callback: EventCallback, _one?: boolean ): this;
}

function on ( this: Cash, eventFullName: Record<string, EventCallback> ): Cash;
function on ( this: Cash, eventFullName: string, callback: EventCallback, _one?: boolean ): Cash;
function on ( this: Cash, eventFullName: string, selector: string | EventCallback, callback: EventCallback, _one?: boolean ): Cash;
function on ( this: Cash, eventFullName: string | Record<string, EventCallback>, selector?: string | EventCallback, callback?: boolean | EventCallback, _one?: boolean ) {

  if ( !isString ( eventFullName ) ) {

    for ( const key in eventFullName ) {

      this.on ( key, selector, eventFullName[key] );

    }

    return this;

  }

  if ( isFunction ( selector ) ) {

    callback = selector;
    selector = '';

  }

  each ( getSplitValues ( eventFullName ), ( i, eventFullName ) => {

    const [name, namespaces] = parseEventName ( getEventNameBubbling ( eventFullName ) );

    this.each ( ( i, ele ) => {

      const finalCallback = function ( event: Event ) {

        if ( event.namespace && !hasNamespaces ( namespaces, event.namespace.split ( eventsNamespacesSeparator ) ) ) return;

        let thisArg: EventTarget = ele;

        if ( selector ) {

          let target = event.target;

          while ( !matches ( target, selector ) ) {

            if ( target === ele ) return;

            target = target.parentNode;

            if ( !target ) return;

          }

          thisArg = target;

          event.___cd = true; // Delegate

        }

        if ( event.___cd ) {

          Object.defineProperty ( event, 'currentTarget', {
            configurable: true,
            get () { // We need to define a getter for this to work everywhere
              return thisArg;
            }
          });

        }

        const returnValue = callback.call ( thisArg, event, event.data );

        if ( _one ) {

          removeEvent ( ele, name, namespaces, selector, finalCallback );

        }

        if ( returnValue === false ) {

          event.preventDefault ();
          event.stopPropagation ();

        }

      };

      finalCallback.guid = callback.guid = ( callback.guid || cash.guid++ );

      addEvent ( ele, name, namespaces, selector, finalCallback );

    });

  });

  return this;

}

fn.on = on;


// @require core/cash.ts
// @require ./on.ts

interface Cash {
  one ( events: Record<string, EventCallback> ): this;
  one ( events: string, callback: EventCallback ): this;
  one ( events: string, selector: string | EventCallback, callback: EventCallback ): this;
}

function one ( this: Cash, eventFullName: Record<string, EventCallback> ): Cash;
function one ( this: Cash, eventFullName: string, callback: EventCallback ): Cash;
function one ( this: Cash, eventFullName: string, selector: string | EventCallback, callback: EventCallback ): Cash;
function one ( this: Cash, eventFullName: string | Record<string, EventCallback>, selector?: string | EventCallback, callback?: EventCallback ) {

  return this.on ( eventFullName, selector, callback, true );

};

fn.one = one;


// @require core/cash.ts
// @require core/variables.ts

interface Cash {
  ready ( callback: Function ): this;
}

fn.ready = function ( this: Cash, callback: Function ) {

  if ( doc.readyState !== 'loading' ) {

    callback ( cash );

  } else {

    doc.addEventListener ( 'DOMContentLoaded', () => { callback ( cash ) } );

  }

  return this;

};


// @require core/cash.ts
// @require core/type_checking.ts
// @require core/variables.ts
// @require collection/each.ts
// @require ./helpers/parse_event_name.ts
// @require ./helpers/variables.ts

interface Cash {
  trigger ( event: Event | string, data?: any ): this;
}

fn.trigger = function ( this: Cash, event: Event | string, data?: any ) {

  if ( isString ( event ) ) {

    const [name, namespaces] = parseEventName ( event ),
          type = eventsMouseRe.test ( name ) ? 'MouseEvents' : 'HTMLEvents';

    event = doc.createEvent ( type );
    event.initEvent ( name, true, true );
    event.namespace = namespaces.join ( eventsNamespacesSeparator );

  }

  event.data = data;

  const isEventFocus = ( event.type in eventsFocus );

  return this.each ( ( i, ele ) => {

    if ( isEventFocus && isFunction ( ele[event.type] ) ) {

      ele[event.type]();

    } else {

      ele.dispatchEvent ( event );

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

function getValue ( ele: EleLoose ): string | string[] {

  if ( ele.multiple && ele.options ) return pluck ( filter.call ( ele.options, option => option.selected && !option.disabled && !option.parentNode.disabled ), 'value' );

  return ele.value || '';

}


const queryEncodeSpaceRe = /%20/g;

function queryEncode ( prop: string, value: string ): string {

  return `&${encodeURIComponent ( prop )}=${encodeURIComponent ( value ).replace ( queryEncodeSpaceRe, '+' )}`;

}


// @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require ./helpers/get_value.ts
// @require ./helpers/query_encode.ts

interface Cash {
  serialize (): string;
}

const skippableRe = /file|reset|submit|button|image/i,
      checkableRe = /radio|checkbox/i;

fn.serialize = function ( this: Cash ) {

  let query = '';

  this.each ( ( i, ele ) => {

    each ( ele.elements || [ele], ( i, ele: EleLoose ) => {

      if ( ele.disabled || !ele.name || ele.tagName === 'FIELDSET' || skippableRe.test ( ele.type ) || ( checkableRe.test ( ele.type ) && !ele.checked ) ) return;

      const value = getValue ( ele );

      if ( !isUndefined ( value ) ) {

        const values = isArray ( value ) ? value : [value];

        each ( values, ( i, value ) => {

          query += queryEncode ( ele.name, value );

        });

      }

    });

  });

  return query.slice ( 1 );

};


// @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/get_value.ts

interface Cash {
  val (): string | string[];
  val ( value: string | string[] ): this;
}

function val ( this: Cash ): string | string[];
function val ( this: Cash, value: string | string[] ): Cash;
function val ( this: Cash, value?: string | string[] ) {

  if ( isUndefined ( value ) ) return this[0] && getValue ( this[0] );

  return this.each ( ( i, ele ) => {

    if ( ele.tagName === 'SELECT' ) {

      const eleValue = isArray ( value ) ? value : ( isNull ( value ) ? [] : [value] );

      each ( ele.options, ( i, option ) => {

        option.selected = eleValue.indexOf ( option.value ) >= 0;

      });

    } else {

      ele.value = isNull ( value ) ? '' : value;

    }

  });

}

fn.val = val;


// @optional ./serialize.ts
// @optional ./val.ts


// @require core/cash.ts
// @require collection/map.ts

interface Cash {
  clone (): this;
}

fn.clone = function ( this: Cash ) {

  return this.map ( ( i, ele ) => ele.cloneNode ( true ) );

};


// @require core/cash.ts
// @require collection/each.ts

interface Cash {
  detach (): this;
}

fn.detach = function ( this: Cash ) {

  return this.each ( ( i, ele ) => {

    if ( ele.parentNode ) {

      ele.parentNode.removeChild ( ele );

    }

  });

};


// @require ./cash.ts
// @require ./variables.ts
// @require ./type_checking.ts
// @require collection/get.ts
// @require manipulation/detach.ts

interface CashStatic {
  parseHTML ( html: string ): EleLoose[];
}

const fragmentRe = /^\s*<(\w+)[^>]*>/,
      singleTagRe = /^\s*<(\w+)\s*\/?>(?:<\/\1>)?\s*$/;

const containers = {
  '*': div,
  tr: tbody,
  td: tr,
  th: tr,
  thead: table,
  tbody: table,
  tfoot: table
};

function parseHTML ( html: string ): EleLoose[] {

  if ( !isString ( html ) ) return [];

  if ( singleTagRe.test ( html ) ) return [createElement ( RegExp.$1 )];

  const fragment = fragmentRe.test ( html ) && RegExp.$1,
        container = containers[fragment] || containers['*'];

  container.innerHTML = html;

  return cash ( container.childNodes ).detach ().get ();

}

cash.parseHTML = parseHTML;


// @optional ./camel_case.ts
// @optional ./each.ts
// @optional ./extend.ts
// @optional ./find.ts
// @optional ./get_compare_function.ts
// @optional ./get_split_values.ts
// @optional ./guid.ts
// @optional ./matches.ts
// @optional ./parse_html.ts
// @optional ./unique.ts
// @optional ./variables.ts
// @require ./cash.ts
// @require ./type_checking.ts


// @require core/cash.ts
// @require collection/each.ts

interface Cash {
  empty (): this;
}

fn.empty = function ( this: Cash ) {

  return this.each ( ( i, ele ) => {

    while ( ele.firstChild ) {

      ele.removeChild ( ele.firstChild );

    }

  });

};


// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts

interface Cash {
  html (): string;
  html ( html: string ): this;
}

function html ( this: Cash ): string;
function html ( this: Cash, html: string ): Cash;
function html ( this: Cash, html?: string ) {

  if ( isUndefined ( html ) ) return this[0] && this[0].innerHTML;

  return this.each ( ( i, ele ) => { ele.innerHTML = html } );

}

fn.html = html;


// @require core/cash.ts
// @require events/off.ts
// @require ./detach.ts

interface Cash {
  remove (): this;
}

fn.remove = function ( this: Cash ) {

  return this.detach ().off ();

};


// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts

interface Cash {
  text (): string;
  text ( text: string ): this;
}

function text ( this: Cash ): string;
function text ( this: Cash, text: string ): Cash;
function text ( this: Cash, text?: string ) {

  if ( isUndefined ( text ) ) return this[0] ? this[0].textContent : '';

  return this.each ( ( i, ele ) => { ele.textContent = text } );

};

fn.text = text;


// @require core/cash.ts

interface Cash {
  unwrap (): this;
}

fn.unwrap = function ( this: Cash ) {

  this.parent ().each ( ( i, ele ) => {

    const $ele = cash ( ele );

    $ele.replaceWith ( $ele.children () );

  });

  return this;

};


// @require core/cash.ts
// @require core/variables.ts

interface Cash {
  offset (): undefined | {
    top: number,
    left: number
  };
}

fn.offset = function ( this: Cash ) {

  const ele = this[0];

  if ( !ele ) return;

  const rect = ele.getBoundingClientRect ();

  return {
    top: rect.top + win.pageYOffset - docEle.clientTop,
    left: rect.left + win.pageXOffset - docEle.clientLeft
  };

};


// @require core/cash.ts

interface Cash {
  offsetParent (): Cash;
}

fn.offsetParent = function ( this: Cash ) {

  return cash ( this[0] && this[0].offsetParent );

};


// @require core/cash.ts

interface Cash {
  position (): undefined | {
    top: number,
    left: number
  };
}

fn.position = function ( this: Cash ) {

  const ele = this[0];

  if ( !ele ) return;

  return {
    left: ele.offsetLeft,
    top: ele.offsetTop
  };

};


// @optional ./offset.ts
// @optional ./offset_parent.ts
// @optional ./position.ts


// @require core/cash.ts
// @require core/filtered.ts
// @require core/pluck.ts
// @require core/unique.ts
// @require core/variables.ts
// @require collection/each.ts

interface Cash {
  children ( comparator?: Comparator ): Cash;
}

fn.children = function ( this: Cash, comparator?: Comparator ) {

  return filtered ( cash ( unique ( pluck ( this, ele => ele.children ) ) ), comparator );

};


// @require core/cash.ts
// @require core/pluck.ts
// @require core/unique.ts
// @require collection/each.ts

interface Cash {
  contents (): Cash;
}

fn.contents = function ( this: Cash ) {

  return cash ( unique ( pluck ( this, ele => ele.tagName === 'IFRAME' ? [ele.contentDocument] : ele.childNodes ) ) );

};


// @require core/cash.ts
// @require core/pluck.ts
// @require core/unique.ts
// @require core/find.ts
// @require core/variables.ts

interface Cash {
  find ( selector: string ): Cash;
}

fn.find = function ( this: Cash, selector: string ) {

  return cash ( unique ( pluck ( this, ele => find ( selector, ele ) ) ) );

};


// @require core/variables.ts
// @require collection/filter.ts
// @require traversal/find.ts

const HTMLCDATARe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
      scriptTypeRe = /^$|^module$|\/(java|ecma)script/i,
      scriptAttributes: ('type' | 'src' | 'nonce' | 'noModule')[] = ['type', 'src', 'nonce', 'noModule'];

function evalScripts ( node: Node, doc: Document ): void {

  const collection = cash ( node );

  collection.filter ( 'script' ).add ( collection.find ( 'script' ) ).each ( ( i, ele: HTMLScriptElement ) => {

    if ( scriptTypeRe.test ( ele.type ) && docEle.contains ( ele ) ) { // The script type is supported // The element is attached to the DOM // Using `documentElement` for broader browser support

      const script = createElement ( 'script' );

      script.text = ele.textContent.replace ( HTMLCDATARe, '' );

      each ( scriptAttributes, ( i, attr ) => {

        if ( ele[attr] ) script[attr] = ele[attr];

      });

      doc.head.insertBefore ( script, null );
      doc.head.removeChild ( script );

    }

  });

}


// @require ./eval_scripts.ts

function insertElement ( anchor: EleLoose, target: EleLoose, left?: boolean, inside?: boolean ): void {

  if ( inside ) { // prepend/append

    anchor.insertBefore ( target, left ? anchor.firstElementChild : null );

  } else { // before/after

    anchor.parentNode.insertBefore ( target, left ? anchor : anchor.nextElementSibling );

  }

  evalScripts ( target, anchor.ownerDocument );

}


// @require ./insert_element.ts

function insertSelectors<T extends ArrayLike<EleLoose> = ArrayLike<EleLoose>> ( selectors: ArrayLike<Selector>, anchors: T, inverse?: boolean, left?: boolean, inside?: boolean, reverseLoop1?: boolean, reverseLoop2?: boolean, reverseLoop3?: boolean ): T {

  each ( selectors, ( si, selector: Selector ) => {

    each ( cash ( selector ), ( ti, target ) => {

      each ( cash ( anchors ), ( ai, anchor ) => {

        const anchorFinal = inverse ? target : anchor,
              targetFinal = inverse ? anchor : target;

        insertElement ( anchorFinal, !ai ? targetFinal : targetFinal.cloneNode ( true ), left, inside );

      }, reverseLoop3 );

    }, reverseLoop2 );

  }, reverseLoop1 );

  return anchors;

}


// @require core/cash.ts
// @require ./helpers/insert_selectors.ts

interface Cash {
  after ( ...selectors: Selector[] ): this;
}

fn.after = function ( this: Cash ) {

  return insertSelectors ( arguments, this, false, false, false, true, true );

};


// @require core/cash.ts
// @require ./helpers/insert_selectors.ts

interface Cash {
  append ( ...selectors: Selector[] ): this;
}

fn.append = function ( this: Cash ) {

  return insertSelectors ( arguments, this, false, false, true );

};


// @require core/cash.ts
// @require ./helpers/insert_selectors.ts

interface Cash {
  appendTo ( selector: Selector ): this;
}

fn.appendTo = function ( this: Cash, selector: Selector ) {

  return insertSelectors ( arguments, this, true, false, true );

};


// @require core/cash.ts
// @require ./helpers/insert_selectors.ts

interface Cash {
  before ( ...selectors: Selector[] ): this;
}

fn.before = function ( this: Cash ) {

  return insertSelectors ( arguments, this, false, true );

};


// @require core/cash.ts
// @require ./helpers/insert_selectors.ts

interface Cash {
  insertAfter ( selector: Selector ): this;
}

fn.insertAfter = function ( this: Cash, selector: Selector ) {

  return insertSelectors ( arguments, this, true, false, false, false, false, true );

};


// @require core/cash.ts
// @require ./helpers/insert_selectors.ts

interface Cash {
  insertBefore ( selector: Selector ): this;
}

fn.insertBefore = function ( this: Cash, selector: Selector ) {

  return insertSelectors ( arguments, this, true, true );

};


// @require core/cash.ts
// @require ./helpers/insert_selectors.ts

interface Cash {
  prepend ( ...selectors: Selector[] ): this;
}

fn.prepend = function ( this: Cash ) {

  return insertSelectors ( arguments, this, false, true, true, true, true );

};


// @require core/cash.ts
// @require ./helpers/insert_selectors.ts

interface Cash {
  prependTo ( selector: Selector ): this;
}

fn.prependTo = function ( this: Cash, selector: Selector ) {

  return insertSelectors ( arguments, this, true, true, true, false, false, true );

};


// @require core/cash.ts
// @require ./before.ts
// @require ./remove.ts

interface Cash {
  replaceWith ( selector: Selector ): this;
}

fn.replaceWith = function ( this: Cash, selector: Selector ) {

  return this.before ( selector ).remove ();

};


// @require core/cash.ts
// @require ./replace_with.ts

interface Cash {
  replaceAll ( selector: Selector ): this;
}

fn.replaceAll = function ( this: Cash, selector: Selector ) {

  cash ( selector ).replaceWith ( this );

  return this;

};


// @require core/cash.ts
// @require collection/first.ts
// @require manipulation/append_to.ts
// @require manipulation/before.ts

interface Cash {
  wrapAll ( selector?: Selector ): this;
}

fn.wrapAll = function ( this: Cash, selector?: Selector ) {

  let structure = cash ( selector ),
      wrapper: Element = structure[0];

  while ( wrapper.children.length ) wrapper = wrapper.firstElementChild;

  this.first ().before ( structure );

  return this.appendTo ( wrapper );

};


// @require core/cash.ts
// @require collection/each.ts
// @require ./wrap_all.ts

interface Cash {
  wrap ( selector?: Selector ): this;
}

fn.wrap = function ( this: Cash, selector?: Selector ) {

  return this.each ( ( i, ele ) => {

    const wrapper = cash ( selector )[0];

    cash ( ele ).wrapAll ( !i ? wrapper : wrapper.cloneNode ( true ) );

  });

};


// @require core/cash.ts
// @require collection/first.ts
// @require manipulation/append_to.ts

interface Cash {
  wrapInner ( selector?: Selector ): this;
}

fn.wrapInner = function ( this: Cash, selector?: Selector ) {

  return this.each ( ( i, ele ) => {

    const $ele = cash ( ele ),
          contents = $ele.contents ();

    contents.length ? contents.wrapAll ( selector ) : $ele.append ( selector );

  });

};


// @optional ./after.ts
// @optional ./append.ts
// @optional ./append_to.ts
// @optional ./before.ts
// @optional ./clone.ts
// @optional ./detach.ts
// @optional ./empty.ts
// @optional ./html.ts
// @optional ./insert_after.ts
// @optional ./insert_before.ts
// @optional ./prepend.ts
// @optional ./prepend_to.ts
// @optional ./remove.ts
// @optional ./replace_all.ts
// @optional ./replace_with.ts
// @optional ./text.ts
// @optional ./unwrap.ts
// @optional ./wrap.ts
// @optional ./wrap_all.ts
// @optional ./wrap_inner.ts


// @require core/cash.ts
// @require core/find.ts
// @require core/type_checking.ts
// @require collection/filter.ts

interface Cash {
  has ( selector: string | Node ): Cash;
}

fn.has = function ( this: Cash, selector: string | Node ) {

  const comparator = isString ( selector )
                       ? ( i: number, ele: EleLoose ) => find ( selector, ele ).length
                       : ( i: number, ele: EleLoose ) => ele.contains ( selector );

  return this.filter ( comparator );

};


// @require core/cash.ts
// @require core/get_compare_function.ts
// @require core/variables.ts
// @require collection/each.ts

interface Cash {
  is ( comparator?: Comparator ): boolean;
}

fn.is = function ( this: Cash, comparator?: Comparator ) {

  const compare = getCompareFunction ( comparator );

  return some.call ( this, ( ele: EleLoose, i: number ) => compare.call ( ele, i, ele ) );

};


// @require core/cash.ts
// @require core/filtered.ts
// @require core/pluck.ts
// @require core/unique.ts

interface Cash {
  next ( comparator?: Comparator, _all?: boolean ): Cash;
}

fn.next = function ( this: Cash, comparator?: Comparator, _all?: boolean ) {

  return filtered ( cash ( unique ( pluck ( this, 'nextElementSibling', _all ) ) ), comparator );

};


// @require ./next.ts

interface Cash {
  nextAll ( comparator?: Comparator): Cash;
}

fn.nextAll = function ( this: Cash, comparator?: Comparator ) {

  return this.next ( comparator, true );

};


// @require core/cash.ts
// @require core/get_compare_function.ts
// @require collection/filter.ts

interface Cash {
  not ( comparator?: Comparator ): Cash;
}

fn.not = function ( this: Cash, comparator?: Comparator ) {

  const compare = getCompareFunction ( comparator );

  return this.filter ( ( i: number, ele: EleLoose ) => !compare.call ( ele, i, ele ) );

};


// @require core/cash.ts
// @require core/filtered.ts
// @require core/pluck.ts
// @require core/unique.ts

interface Cash {
  parent ( comparator?: Comparator ): Cash;
}

fn.parent = function ( this: Cash, comparator?: Comparator ) {

  return filtered ( cash ( unique ( pluck ( this, 'parentNode' ) ) ), comparator );

};


// @require core/cash.ts
// @require core/variables.ts
// @require traversal/children.ts
// @require traversal/parent.ts
// @require ./get.ts

interface Cash {
  index ( selector?: Selector ): number;
}

fn.index = function ( this: Cash, selector?: Selector ) {

  const child = selector ? cash ( selector )[0] : this[0],
        collection = selector ? this : cash ( child ).parent ().children ();

  return indexOf.call ( collection, child );

};


// @optional ./add.ts
// @optional ./each.ts
// @optional ./eq.ts
// @optional ./filter.ts
// @optional ./first.ts
// @optional ./get.ts
// @optional ./indexFn.ts
// @optional ./last.ts
// @optional ./map.ts
// @optional ./slice.ts


// @require core/cash.ts
// @require collection/filter.ts
// @require ./is.ts
// @require ./parent.ts

interface Cash {
  closest ( comparator?: Comparator ): Cash;
}

fn.closest = function ( this: Cash, comparator?: Comparator ) {

  const filtered = this.filter ( comparator );

  if ( filtered.length ) return filtered;

  const $parent = this.parent ();

  if ( !$parent.length ) return filtered;

  return $parent.closest ( comparator );

};


// @require core/cash.ts
// @require core/filtered.ts
// @require core/matches.ts
// @require core/unique.ts
// @require core/variables.ts
// @require collection/each.ts

interface Cash {
  parents ( comparator?: Comparator ): Cash;
}

fn.parents = function ( this: Cash, comparator?: Comparator ) {

  return filtered ( cash ( unique ( pluck ( this, 'parentElement', true ) ) ), comparator );

};


// @require core/cash.ts
// @require core/filtered.ts
// @require core/pluck.ts
// @require core/unique.ts

interface Cash {
  prev ( comparator?: Comparator, _all?: boolean ): Cash;
}

fn.prev = function ( this: Cash, comparator?: Comparator, _all?: boolean ) {

  return filtered ( cash ( unique ( pluck ( this, 'previousElementSibling', _all ) ) ), comparator );

};


// @require ./prev.ts

interface Cash {
  prevAll ( comparator?: Comparator ): Cash;
}

fn.prevAll = function ( this: Cash, comparator?: Comparator ) {

  return this.prev ( comparator, true );

};


// @require core/cash.ts
// @require core/filtered.ts
// @require core/pluck.ts
// @require core/unique.ts
// @require core/variables.ts
// @require collection/each.ts
// @require ./children.ts
// @require ./not.ts
// @require ./parent.ts

interface Cash {
  siblings ( comparator?: Comparator ): Cash;
}

fn.siblings = function ( this: Cash, comparator?: Comparator ) {

  return filtered ( cash ( unique ( pluck ( this, ele => cash ( ele ).parent ().children ().not ( ele ) ) ) ), comparator );

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
export {Cash, CashStatic, Ele as Element, Selector, Comparator, Context};
