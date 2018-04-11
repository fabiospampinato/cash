
// @require ./compute_style.js

function computeStyleInt ( ele, prop ) {
  return parseInt ( computeStyle ( ele, prop ), 10 ) || 0;
}
