
// @require core/cash.ts
// @require events/off.ts
// @require ./detach.ts

fn.remove = function () {
  return this.detach ().off ();
};
