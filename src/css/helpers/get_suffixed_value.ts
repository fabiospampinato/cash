
// @require core/type_checking.ts
// @require ./is_css_variable.ts

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
  zIndex: true,
  zoom: true
};

function getSuffixedValue ( prop: string, value: number | string, isVariable: boolean = isCSSVariable ( prop ) ): number | string {

  return !isVariable && !numericProps[prop] && isNumeric ( value ) ? `${value}px` : value;

}
