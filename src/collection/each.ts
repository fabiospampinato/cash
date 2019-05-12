
// @require core/cash.ts
// @require core/each.ts

interface Cash {
  each ( callback: EachCallback<Ele> ): this;
}

Cash.prototype.each = function ( this: Cash, callback: EachCallback<Ele> ) {
  each ( this, callback );
  return this;
};
