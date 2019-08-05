
interface Cash {
  [index: number]: EleLoose | undefined,
  length: number,
  splice ( start: number, deleteCount?: number ): EleLoose[],
  splice ( start: number, deleteCount: number, ...items: Ele[] ): EleLoose[]
}

interface CashStatic {
  fn: Cash
}

type plainObject = { [index: string]: any };
type falsy = undefined | null | false | 0 | '';

type Ele = Window | Document | HTMLElement | Element | Node;
type EleLoose = Window & Document & HTMLElement & Element & Node; //UGLY: Trick to remove some kind-of useless type errors //URL: https://github.com/kenwheeler/cash/issues/278
type Selector = falsy | string | Function | HTMLCollection | NodeList | Ele | Ele[] | ArrayLike<Ele> | Cash;
type Comparator = string | Ele | Cash | (( this: Ele, index: number, ele: Ele ) => boolean);
type Context = Document | HTMLElement | Element;

type EventCallback = {
  ( event: any, data?: any ): any,
  guid?: number
};
