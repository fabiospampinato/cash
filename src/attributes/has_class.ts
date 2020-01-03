
// @require core/cash.ts
// @require core/get_split_values.ts
// @require core/type_checking.ts
// @require collection/each.ts

interface Cash {
  hasClass ( cls: string ): boolean;
}

fn.hasClass = function ( this: Cash, cls: string ) {

  return !!cls && some.call ( this, ( ele: EleLoose ) => isElement ( ele ) && ele.classList.contains ( cls ) );

};
