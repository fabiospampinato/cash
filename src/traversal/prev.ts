
// @require core/cash.ts

interface Cash {
  prev (): Cash;
}

Cash.prototype.prev = function ( this: Cash ) {
  return cash ( this[0] && this[0].previousElementSibling );
};
