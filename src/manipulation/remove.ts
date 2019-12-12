
// @require core/cash.ts
// @require events/off.ts
// @require ./detach.ts

interface Cash {
  remove (): this;
}

fn.remove = function ( this: Cash ) {

  return this.detach ().off ();

};
