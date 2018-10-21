
// @require core/cash.ts
// @require core/variables.ts

fn.slice = function () {
  return cash ( slice.apply ( this, arguments ) );
};
