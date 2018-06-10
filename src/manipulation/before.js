
// @require core/cash.js
// @require core/each.js
// @require ./insert_before.js

fn.before = function () {
  each ( arguments, content => {
    cash ( content ).insertBefore ( this );
  });
  return this;
};
