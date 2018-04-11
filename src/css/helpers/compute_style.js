
// @require core/index.js

function computeStyle ( ele, prop ) {
  const style = win.getComputedStyle ( ele, null );
  return prop ? style[prop] : style;
}
