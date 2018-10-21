
// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts
// @require collection/slice.ts
// @require ./insert_after.ts

fn.after = function () {
  each ( reverse.apply ( arguments ), content => {
    reverse.apply ( cash ( content ).slice () ).insertAfter ( this );
  });
  return this;
};
