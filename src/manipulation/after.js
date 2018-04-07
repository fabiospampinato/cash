
// @require ./insert_after.js

fn.after = function ( content ) {
  cash ( content ).insertAfter ( this );
  return this;
};
