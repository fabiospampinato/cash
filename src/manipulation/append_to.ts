
// @require core/cash.ts
// @require ./helpers/insert_content.ts

fn.appendTo = function ( parent ) {
  insertContent ( cash ( parent ), this );
  return this;
};
