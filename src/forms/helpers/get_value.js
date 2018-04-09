
function getValue ( ele ) {

  const type = ele.type;

  if ( !type ) return undefined;

  switch ( type.toLowerCase () ) {
    case 'select-one':
      return getValueSelectSingle ( ele );
    case 'select-multiple':
      return getValueSelectMultiple ( ele );
    default:
      return ele.value;
  }

}
