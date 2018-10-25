
// @require ./cash.ts

function matches ( ele: HTMLElement, selector: string ): boolean {

  return !!ele && !!ele.matches && ele.matches ( selector );

}

interface CashStatic {
  matches ( ele: HTMLElement, selector: string ): boolean;
}

cash.matches = matches;
