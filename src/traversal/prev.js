
// @require core/index.js

fn.prev = function () {
  return cash ( this[0] ? this[0].previousElementSibling : undefined );
};
