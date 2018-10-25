
// @require core/cash.ts
// @require core/each.ts

interface Cash {
  each ( callback: Function ): this;
}

Cash.prototype.each = function ( this: Cash, callback: Function ) {
  each ( this, callback );
  return this;
};
