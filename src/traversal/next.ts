
// @require core/cash.ts
// @require core/filtered.ts
// @require core/pluck.ts
// @require core/unique.ts

interface Cash {
  next ( comparator?: Comparator ): Cash;
}

Cash.prototype.next = function ( this: Cash, comparator?: Comparator ) {

  return filtered ( cash ( unique ( pluck ( this, 'nextElementSibling' ) ) ), comparator );

};
