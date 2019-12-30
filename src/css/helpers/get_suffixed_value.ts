
// @require core/type_checking.ts
// @require ./is_css_variable.ts

const numericProps: { [prop: string]: true | undefined } = {
  animationIterationCount: true,
  columnCount: true,
  flexGrow: true,
  flexShrink: true,
  fontWeight: true,
  gridArea: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnStart: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowStart: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  widows: true,
  zIndex: true
};

function getSuffixedValue ( prop: string, value: number | string, isVariable: boolean = isCSSVariable ( prop ) ): string {

  return !isVariable && !numericProps[prop] && isNumeric ( value ) ? `${value}px` : value;

}
