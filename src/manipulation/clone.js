
// @require core/index.js

fn.clone = function () {
  return this.map ( ele => ele.cloneNode ( true ) );
};
