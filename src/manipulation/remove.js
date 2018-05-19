
// @require core/cash.js
// @require events/off.js
// @require ./detach.js

fn.remove = function () {
  return this.detach ().off ();
};
