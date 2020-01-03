
// @require ./parents.ts

interface Cash {
  parentsUntil ( until?: Comparator, comparator?: Comparator): Cash;
}

fn.parentsUntil = function ( this: Cash, until?: Comparator, comparator?: Comparator ) {

  return this.parents ( comparator, until );

};
