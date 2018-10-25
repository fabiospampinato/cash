
// @require core/pluck.ts
// @require core/variables.ts

function getValue ( ele ): string | string[] {

  if ( ele.multiple ) return pluck ( filter.call ( ele.options, option => option.selected && !option.disabled && !option.parentNode.disabled ), 'value' ) as string[];

  return ele.value || '';

}
