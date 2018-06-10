
// @require core/cash.js
// @require core/each.js
// @require core/variables.js
// @require ./insert_after.js

fn.after = function () {
  each ( reverse.apply ( arguments ), content => {
    reverse.apply ( cash ( content ) ).insertAfter ( this );
  });
  return this;
};
