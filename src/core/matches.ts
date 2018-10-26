
// @require ./cash.ts

function matches ( ele: HTMLElement, selector: string ): boolean {

  const matches = ele && ( ele.matches || ele['webkitMatchesSelector'] || ele['mozMatchesSelector'] || ele['msMatchesSelector'] || ele['oMatchesSelector'] );

  return !!matches && matches.call ( ele, selector );

}

interface CashStatic {
  matches ( ele: HTMLElement, selector: string ): boolean;
}

cash.matches = matches;
