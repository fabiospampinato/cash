
// @require core/cash.ts
// @require events/off.ts
// @require ./detach.ts

interface Cash {
  remove (): this;
}

Cash.prototype.remove = function ( this: Cash ) {
  return this.detach ().off ();
};
