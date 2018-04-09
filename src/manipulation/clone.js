
// @require core/index.js

fn.clone = function () {
  return this.map ( ( i, ele ) => ele.cloneNode ( true ) );
};
