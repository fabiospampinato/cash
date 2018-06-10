
// @require core/cash.js
// @require core/variables.js
// @require ./helpers/insert_content.js

fn.prependTo = function ( parent ) {
  insertContent ( cash ( parent ), reverse.apply ( this ), true );
  return this;
};
