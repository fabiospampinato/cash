
// @require ./on.js

fn.one = function ( eventName, delegate, callback ) {
  return this.on ( eventName, delegate, callback, true );
};
