
// @require core/cash.ts
// @require core/filtered.ts
// @require core/pluck.ts
// @require core/unique.ts
// @require core/variables.ts
// @require collection/each.ts
// @require ./children.ts
// @require ./not.ts
// @require ./parent.ts

interface Cash {
  siblings ( comparator?: Comparator ): Cash;
}

fn.siblings = function ( this: Cash, comparator?: Comparator ) {

  return filtered ( cash ( unique ( pluck ( this, ele => cash ( ele ).parent ().children ().not ( ele ) ) ) ), comparator );

};
