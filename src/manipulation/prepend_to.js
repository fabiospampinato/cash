
// @require core/cash.js
// @require ./helpers/insert_content.js

fn.prependTo = function ( parent ) {
  insertContent ( cash ( parent ), this, true );
  return this;
};
