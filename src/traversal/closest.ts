
// @require core/cash.ts
// @require collection/filter.ts
// @require ./is.ts
// @require ./parent.ts

interface Cash {
  closest ( comparator?: Comparator ): Cash;
}

fn.closest = function ( this: Cash, comparator?: Comparator ) {

  const filtered = this.filter ( comparator );

  if ( filtered.length ) return filtered;

  const $parent = this.parent ();

  if ( !$parent.length ) return filtered;

  return $parent.closest ( comparator );

};
