
// @require core/cash.ts
// @require collection/map.ts

interface Cash {
  clone (): this;
}

Cash.prototype.clone = function ( this: Cash ) {
  return this.map ( ( i, ele ) => ele.cloneNode ( true ) );
};
