
// @require css/helpers/compute_style.ts

function isHidden ( ele: Element ): boolean {

  return computeStyle ( ele, 'display' ) === 'none';

}
