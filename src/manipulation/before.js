
// @require ./insert_before.js

fn.before = function ( content ) {
  cash ( content ).insertBefore ( this );
  return this;
};
