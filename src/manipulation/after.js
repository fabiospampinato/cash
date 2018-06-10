
// @require core/cash.js
// @require core/each.js
// @require ./insert_after.js

fn.after = function () {
  each ( arguments, content => {
    cash ( content ).insertAfter ( this );
  });
  return this;
};
