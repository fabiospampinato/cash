
// @require core/cash.ts
// @require ./replace_with.ts

fn.replaceAll = function ( content ) {
  cash ( content ).replaceWith ( this );
  return this;
};
