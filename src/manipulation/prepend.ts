
// @require core/cash.ts
// @require core/each.ts
// @require ./helpers/insert_content.ts

fn.prepend = function () {
  each ( arguments, content => {
    insertContent ( this, content, true );
  });
  return this;
};
