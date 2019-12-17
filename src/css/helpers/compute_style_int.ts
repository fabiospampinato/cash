
// @require ./compute_style.ts

function computeStyleInt ( ele: EleLoose, prop: string ): number {

  return parseInt ( computeStyle ( ele, prop ), 10 ) || 0;

}
