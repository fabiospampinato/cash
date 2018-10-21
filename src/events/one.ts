
// @require core/cash.ts
// @require ./on.ts

fn.one = function ( eventFullName, delegate, callback ) {
  return this.on ( eventFullName, delegate, callback, true );
};
