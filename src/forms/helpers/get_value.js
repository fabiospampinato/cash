
function getValue ( ele ) {

  const type = ele.type;

  if ( !type ) return null;

  switch ( type.toLowerCase () ) {
    case 'select-one':
      return getValueSelectSingle ( ele );
    case 'select-multiple':
      return getValueSelectMultiple ( ele );
    case 'radio':
    case 'checkbox':
      return ele.checked ? ele.value : null;
    default:
      return ele.value || null;
  }

}
