
// @require ./get_value_select_single.ts
// @require ./get_value_select_multiple.ts

const selectOneRe = /select-one/i,
      selectMultipleRe = /select-multiple/i;

function getValue ( ele: HTMLElement ): string | string[] {

  const type = ele['type'];

  if ( selectOneRe.test ( type ) ) return getValueSelectSingle ( ele as HTMLSelectElement );

  if ( selectMultipleRe.test ( type ) ) return getValueSelectMultiple ( ele as HTMLSelectElement );

  return ele['value'] || '';

}
