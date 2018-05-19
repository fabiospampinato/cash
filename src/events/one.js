
// @require core/cash.js
// @require ./on.js

fn.one = function ( eventFullName, delegate, callback ) {
  return this.on ( eventFullName, delegate, callback, true );
};
