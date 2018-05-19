
// @require core/cash.js
// @require collection/map.js

fn.clone = function () {
  return this.map ( ( i, ele ) => ele.cloneNode ( true ) );
};
