
// @require core/cash.ts
// @require core/filtered.ts
// @require core/pluck.ts
// @require core/unique.ts

interface Cash {
  next ( comparator?: Comparator, _all?: boolean, _until?: Comparator ): Cash;
}

fn.next = function ( this: Cash, comparator?: Comparator, _all?: boolean, _until?: Comparator ) {

  return filtered ( cash ( unique ( pluck ( this, 'nextElementSibling', _all, _until ) ) ), comparator );

};
