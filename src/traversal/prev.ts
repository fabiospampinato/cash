
// @require core/cash.ts
// @require core/pluck.ts
// @require core/unique.ts

interface Cash {
  prev (): Cash;
}

Cash.prototype.prev = function ( this: Cash ) {

  return cash ( unique ( pluck ( this, 'previousElementSibling' ) ) );

};
