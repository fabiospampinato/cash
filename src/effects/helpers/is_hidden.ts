
// @require css/helpers/compute_style.ts

function isHidden ( ele: EleLoose ): boolean {

  return computeStyle ( ele, 'display' ) === 'none';

}
