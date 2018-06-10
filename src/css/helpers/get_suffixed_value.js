
// @require core/type_checking.js
// @require ./is_css_variable.js

const numericProps = {
  animationIterationCount: true,
  columnCount: true,
  flexGrow: true,
  flexShrink: true,
  fontWeight: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  widows: true,
  zIndex: true
};

function getSuffixedValue ( prop, value, isVariable = isCSSVariable ( prop ) ) {

  return !isVariable && !numericProps[prop] && isNumeric ( value ) ? `${value}px` : value;

}
