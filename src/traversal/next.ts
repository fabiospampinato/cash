
// @require core/cash.ts

interface Cash {
  next (): Cash;
}

Cash.prototype.next = function ( this: Cash ) {
  return cash ( this[0] && this[0].nextElementSibling );
};
