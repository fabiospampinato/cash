
// @require core/cash.ts
// @require ./toggle.ts

interface Cash {
  show (): this;
}

Cash.prototype.show = function ( this: Cash ) {
  return this.toggle ( true );
};
