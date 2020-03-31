
interface Event {
  namespace: string,
  data: any,
  ___cd?: boolean, // Delegate
  ___ifocus?: boolean, // Ignore focus
  ___iblur?: boolean, // Ignore blur
  ___ot?: string, // Original type
  ___td?: boolean // Trigger data
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
