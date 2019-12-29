
// @require ./cash.ts

function matches ( ele: any, selector: string ): boolean {

  const matches = ele && ( ele['matches'] || ele['webkitMatchesSelector'] || ele['msMatchesSelector'] );

  return !!matches && matches.call ( ele, selector );

}
