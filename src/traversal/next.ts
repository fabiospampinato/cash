
// @require core/cash.ts
// @require core/pluck.ts
// @require core/unique.ts

interface Cash {
  next (): Cash;
}

Cash.prototype.next = function ( this: Cash ) {

  return cash ( unique ( pluck ( this, 'nextElementSibling' ) ) );

};
