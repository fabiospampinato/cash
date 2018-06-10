
// @require core/variables.js

function computeStyle ( ele, prop, isVariable ) {
  if ( ele.nodeType !== 1 ) return;
  const style = win.getComputedStyle ( ele, null );
  return prop ? ( isVariable ? style.getPropertyValue ( prop ) : style[prop] ) : style;
}
