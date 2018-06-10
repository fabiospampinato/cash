
// @require core/each.js

function getValueSelectMultiple ( ele ) {

  const values = [];

  each ( ele.options, option => {
    if ( option.selected && !option.disabled && !option.parentNode.disabled ) {
      values.push ( option.value );
    }
  });

  return values;

}
