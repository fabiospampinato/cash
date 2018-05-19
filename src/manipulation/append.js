
// @require core/cash.js
// @require ./helpers/insert_content.js

fn.append = function ( content ) {
  insertContent ( this, content );
  return this;
};
