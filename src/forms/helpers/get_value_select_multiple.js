
function getValueSelectMultiple ( ele ) {

  const values = [];

  each ( ele.options, option => {
    if ( option.selected ) {
      values.push ( option.value );
    }
  });

  return values.length ? values : null;

}