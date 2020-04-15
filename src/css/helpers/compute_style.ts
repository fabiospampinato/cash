
// @require core/type_checking.ts
// @require core/variables.ts

function computeStyle ( ele: EleLoose, prop: string, isVariable?: boolean ): string | undefined {

  if ( !isElement ( ele ) ) return;

  const style = win.getComputedStyle ( ele, null );

  return isVariable ? style.getPropertyValue ( prop ) || undefined : style[prop] || ele.style[prop];

}
