
// @require core/cash.js

fn.next = function () {
  return cash ( this[0] && this[0].nextElementSibling );
};
