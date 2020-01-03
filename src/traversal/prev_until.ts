
// @require ./prev.ts

interface Cash {
  prevUntil ( until?: Comparator, comparator?: Comparator ): Cash;
}

fn.prevUntil = function ( this: Cash, until?: Comparator, comparator?: Comparator ) {

  return this.prev ( comparator, true, until );

};
