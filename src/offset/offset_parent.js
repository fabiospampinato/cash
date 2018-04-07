
// @require core/index.js

fn.offsetParent = function () {
  return cash ( this[0].offsetParent ); //FIXME: It throws an error for empty collections
};
