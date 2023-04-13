
interface Event {
  namespace: string,
  data: any,
  relatedTarget?: Node | null,
  ___ifocus?: boolean, // Ignore focus
  ___iblur?: boolean, // Ignore blur
  ___ot?: string, // Original type
  ___td?: boolean // Trigger data
}

interface Cash {
  [Symbol.iterator](): IterableIterator<EleLoose>,
  [index: number]: EleLoose | undefined,
  length: number,
  splice ( start: number, deleteCount?: number ): EleLoose[],
  splice ( start: number, deleteCount: number, ...items: Ele[] ): EleLoose[]
}

interface CashStatic {
  fn: Cash
}

type falsy = undefined | null | false | 0 | '';

type Ele = Window | Document | HTMLElement | Element | Node;
type EleLoose = HTMLElement & Element & Node; //UGLY: Trick to remove some kind-of useless type errors //URL: https://github.com/fabiospampinato/cash/issues/278
type Selector = falsy | string | Function | HTMLCollection | NodeList | Ele | Ele[] | ArrayLike<Ele> | Cash;
type Comparator = string | Ele | Cash | (( this: EleLoose, index: number, ele: EleLoose ) => boolean);
type Context = Document | HTMLElement | Element | string;

type PlainObject<T> = Record<string, T>; //FIXME: Arrays can be assigned to this type, for whatever reason

type EventCallback = {
  ( event: any, data?: any ): any,
  guid?: number
};
