
interface Cash {
  [index: number]: Window & Document & HTMLElement & Element; //FIXME: Quick and dirty way of getting rid of most type errors
  length: number;
  splice ( start: number, deleteCount?: number );
  splice ( start: number, deleteCount: number, ...items: Ele[] );
}

interface CashStatic {
  fn: Cash;
}

type plainObject = { [index: string]: any };
type falsy = undefined | null | false | 0 | '';

type Ele = Window | Document | HTMLElement | Element;
type Selector = falsy | string | Function | HTMLCollection | NodeList | Ele | Ele[] | Cash;
type Comparator = string | Function | Ele | Cash;
type Context = Document | HTMLElement | Element;
