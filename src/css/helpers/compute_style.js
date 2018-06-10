
// @require core/variables.js

function computeStyle ( ele, prop ) {
  if ( ele.nodeType !== 1 ) return;
  const style = win.getComputedStyle ( ele, null );
  return prop ? style[prop] : style;
}
