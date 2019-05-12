
// @require core/cash.ts
// @require core/get_split_values.ts
// @require collection/each.ts

interface Cash {
  hasClass ( cls: string ): boolean;
}

Cash.prototype.hasClass = function ( this: Cash, cls: string ) {
  return cls && some.call ( this, ( ele: Ele ) => ele.classList.contains ( cls ) );
};
