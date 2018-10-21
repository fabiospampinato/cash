
// @require ./compute_style.ts

function computeStyleInt ( ele, prop ) {
  return parseInt ( computeStyle ( ele, prop ), 10 ) || 0;
}
