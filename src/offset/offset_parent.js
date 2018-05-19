
// @require core/cash.js

fn.offsetParent = function () {
  return cash ( this[0] && this[0].offsetParent );
};
