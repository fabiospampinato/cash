
// @require core/cash.js
// @require ./replace_with.js

fn.replaceAll = function ( content ) {
  cash ( content ).replaceWith ( this );
  return this;
};
