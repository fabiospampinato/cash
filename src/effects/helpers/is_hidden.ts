
// @require css/helpers/compute_style.ts

function isHidden ( ele: HTMLElement ): boolean {

  return computeStyle ( ele, 'display' ) === 'none';

}
