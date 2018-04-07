
function getValueSelectSingle ( ele ) {

  const selectedIndex = ele.selectedIndex;

  return selectedIndex >= 0 ? ele.options[selectedIndex].value : null;

}
