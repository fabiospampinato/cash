
// @require core/cash.ts
// @require core/filtered.ts
// @require core/pluck.ts
// @require core/unique.ts

interface Cash {
  prev ( comparator?: Comparator, all?: boolean ): Cash;
}

Cash.prototype.prev = function ( this: Cash, comparator?: Comparator, all?: boolean ) {

  return filtered ( cash ( unique ( pluck ( this, 'previousElementSibling', all ) ) ), comparator );

};
