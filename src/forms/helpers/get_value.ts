
// @require core/pluck.ts
// @require core/variables.ts

function getValue ( ele: EleLoose ): string | string[] {

  if ( ele.multiple && ele.options ) return pluck ( filter.call ( ele.options, option => option.selected && !option.disabled && !option.parentNode.disabled ), 'value' );

  return ele.value || '';

}
