
// @require core/cash.js
// @require core/variables.js

fn.slice = function () {
  return cash ( slice.apply ( this, arguments ) );
};
