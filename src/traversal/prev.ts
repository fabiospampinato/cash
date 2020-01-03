
// @require core/cash.ts
// @require core/filtered.ts
// @require core/pluck.ts
// @require core/unique.ts

interface Cash {
  prev ( comparator?: Comparator, _all?: boolean, _until?: Comparator ): Cash;
}

fn.prev = function ( this: Cash, comparator?: Comparator, _all?: boolean, _until?: Comparator ) {

  return filtered ( cash ( unique ( pluck ( this, 'previousElementSibling', _all, _until ) ) ), comparator );

};
