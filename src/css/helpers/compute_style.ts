
// @require core/variables.ts

function computeStyle ( ele: HTMLElement, prop: string, isVariable?: boolean ): undefined | string {

  if ( ele.nodeType !== 1 || !prop ) return;

  const style = win.getComputedStyle ( ele, null );

  return prop ? ( isVariable ? style.getPropertyValue ( prop ) || undefined : style[prop] ) : style;

}
