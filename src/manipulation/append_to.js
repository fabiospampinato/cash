
// @require core/cash.js
// @require ./helpers/insert_content.js

fn.appendTo = function ( parent ) {
  insertContent ( cash ( parent ), this );
  return this;
};
