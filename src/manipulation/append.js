
// @require core/cash.js
// @require core/each.js
// @require ./helpers/insert_content.js

fn.append = function () {
  each ( arguments, content => {
    insertContent ( this, content );
  });
  return this;
};
