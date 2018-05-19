
// @require core/type_checking.js

const numericProps = {
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

function getSuffixedValue ( prop, value ) {

  return !numericProps[prop] && isNumeric ( value ) ? `${value}px` : value;

}
