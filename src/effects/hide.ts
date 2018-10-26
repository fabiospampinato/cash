
// @require core/cash.ts
// @require ./toggle.ts

interface Cash {
  hide (): this;
}

Cash.prototype.hide = function ( this: Cash ) {
  return this.toggle ( false );
};
