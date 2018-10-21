
// @require ./get_value_select_single.ts
// @require ./get_value_select_multiple.ts

const selectOneRe = /select-one/i,
      selectMultipleRe = /select-multiple/i;

function getValue ( ele ) {

  const type = ele.type;

  if ( selectOneRe.test ( type ) ) return getValueSelectSingle ( ele );

  if ( selectMultipleRe.test ( type ) ) return getValueSelectMultiple ( ele );

  return ele.value;

}
