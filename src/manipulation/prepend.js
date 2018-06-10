
// @require core/cash.js
// @require core/each.js
// @require ./helpers/insert_content.js

fn.prepend = function () {
  each ( arguments, content => {
    insertContent ( this, content, true );
  });
  return this;
};
