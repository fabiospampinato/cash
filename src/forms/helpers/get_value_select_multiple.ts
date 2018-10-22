
// @require core/each.ts

function getValueSelectMultiple ( ele: HTMLSelectElement ): string[] {

  const values: string[] = [];

  each ( ele.options, option => {
    if ( option.selected && !option.disabled && !option.parentNode.disabled ) {
      values.push ( option.value );
    }
  });

  return values;

}
