
// @require core/cash.ts
// @require core/each.ts
// @require ./helpers/insert_content.ts

fn.append = function () {
  each ( arguments, content => {
    insertContent ( this, content );
  });
  return this;
};
