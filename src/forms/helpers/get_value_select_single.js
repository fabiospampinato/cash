
function getValueSelectSingle ( ele ) {

  return ele.selectedIndex < 0 ? null : ele.options[ele.selectedIndex].value;

}
