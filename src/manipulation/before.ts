
// @require core/cash.ts
// @require core/each.ts
// @require ./insert_before.ts

fn.before = function () {
  each ( arguments, content => {
    cash ( content ).insertBefore ( this );
  });
  return this;
};
