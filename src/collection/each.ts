
// @require core/cash.ts
// @require core/each.ts

interface Cash {
  each ( callback: Function ): this;
}

Cash.prototype.each = function ( this: Cash, callback: Function ) {
  each ( this, ( ele, i ) => callback.call ( ele, i, ele ) );
  return this;
};
