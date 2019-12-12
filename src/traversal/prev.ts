
// @require core/cash.ts
// @require core/filtered.ts
// @require core/pluck.ts
// @require core/unique.ts

interface Cash {
  prev ( comparator?: Comparator, _all?: boolean ): Cash;
}

fn.prev = function ( this: Cash, comparator?: Comparator, _all?: boolean ) {

  return filtered ( cash ( unique ( pluck ( this, 'previousElementSibling', _all ) ) ), comparator );

};
