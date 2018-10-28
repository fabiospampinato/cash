
// @require core/cash.ts
// @require core/filtered.ts
// @require core/pluck.ts
// @require core/unique.ts

interface Cash {
  next ( comparator?: Comparator, _all?: boolean ): Cash;
}

Cash.prototype.next = function ( this: Cash, comparator?: Comparator, _all?: boolean ) {

  return filtered ( cash ( unique ( pluck ( this, 'nextElementSibling', _all ) ) ), comparator );

};
