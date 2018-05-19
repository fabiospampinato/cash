
// @require core/cash.js
// @require ./helpers/insert_content.js

fn.prepend = function ( content ) {
  insertContent ( this, content, true );
  return this;
};
