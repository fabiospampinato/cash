
// @require core/cash.ts
// @require core/filtered.ts
// @require core/pluck.ts
// @require core/unique.ts

interface Cash {
  next ( comparator?: Comparator, all?: boolean ): Cash;
}

Cash.prototype.next = function ( this: Cash, comparator?: Comparator, all?: boolean ) {

  return filtered ( cash ( unique ( pluck ( this, 'nextElementSibling', all ) ) ), comparator );

};
