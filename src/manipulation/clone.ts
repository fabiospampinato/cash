
// @require core/cash.ts
// @require collection/map.ts

fn.clone = function () {
  return this.map ( ( i, ele ) => ele.cloneNode ( true ) );
};
