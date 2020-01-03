
// @require ./next.ts

interface Cash {
  nextUntil ( until?: Comparator, comparator?: Comparator): Cash;
}

fn.nextUntil = function ( this: Cash, until?: Comparator, comparator?: Comparator ) {

  return this.next ( comparator, true, until );

};
