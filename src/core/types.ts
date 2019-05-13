
interface Cash {
  [index: number]: Ele;
  length: number;
  splice ( start: number, deleteCount?: number ): Ele[];
  splice ( start: number, deleteCount: number, ...items: Ele[] ): Ele[];
}

interface CashStatic {
  fn: Cash;
}

type plainObject = { [index: string]: any };
type falsy = undefined | null | false | 0 | '';

type Ele = Window | Document | HTMLElement | Element | Node;
type Selector = falsy | string | Function | HTMLCollection | NodeList | Ele | Ele[] | ArrayLike<Ele> | Cash;
type Comparator = string | Ele | Cash | (( this: Ele, index: number, ele: Ele ) => boolean);
type Context = Document | HTMLElement | Element;

type EventCallback = {
  ( event: any, data?: any ): any,
  guid?: number
};
