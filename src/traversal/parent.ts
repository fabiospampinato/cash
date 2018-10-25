
// @require core/cash.ts
// @require core/pluck.ts
// @require core/unique.ts

interface Cash {
  parent (): Cash;
}

Cash.prototype.parent = function ( this: Cash ) {

  return cash ( unique ( pluck ( this, 'parentNode' ) ) );

};
