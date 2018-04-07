
// @require core/index.js

fn.slice = function () {
  return cash ( slice.apply ( this, arguments ) );
};
