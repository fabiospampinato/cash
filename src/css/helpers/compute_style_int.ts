
// @require ./compute_style.ts

function computeStyleInt ( ele: HTMLElement, prop: string ): number {

  return parseInt ( computeStyle ( ele, prop ), 10 ) || 0;

}
