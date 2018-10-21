
// @require core/cash.ts
// @require core/variables.ts
// @require collection/slice.ts
// @require ./helpers/insert_content.ts

fn.prependTo = function ( parent ) {
  insertContent ( cash ( parent ), reverse.apply ( this.slice () ), true );
  return this;
};
