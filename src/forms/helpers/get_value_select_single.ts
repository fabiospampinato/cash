
function getValueSelectSingle ( ele: HTMLSelectElement ): string {

  return ele.selectedIndex < 0 ? null : ele.options[ele.selectedIndex].value;

}
