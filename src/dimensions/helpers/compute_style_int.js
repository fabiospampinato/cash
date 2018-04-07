
// @require core/index.js

function computeStyleInt ( ele, prop ) {
  return parseInt ( win.getComputedStyle ( ele, null )[prop], 10 ) || 0;
}
