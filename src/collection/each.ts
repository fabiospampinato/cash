
// @require core/cash.ts
// @require core/each.ts

interface Cash {
  each ( callback: EachCallback<EleLoose> ): this;
}

Cash.prototype.each = function ( this: Cash, callback: EachCallback<EleLoose> ) {
  each ( this, callback );
  return this;
};
