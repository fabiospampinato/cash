
const numberProps = {
  animationIterationCount: true,
  columnCount: true,
  fillOpacity: true,
  flexGrow: true,
  flexShrink: true,
  fontWeight: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  widows: true,
  zIndex: true,
  zoom: true
};

function getSuffixedValue ( prop, value ) {

  return !numberProps[prop] && isNumeric ( value ) ? `${value}px` : value;

}
