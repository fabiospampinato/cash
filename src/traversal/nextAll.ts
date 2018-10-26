
// @require ./next.ts

interface Cash {
  nextAll ( comparator?: Comparator): Cash;
}

Cash.prototype.nextAll = function ( this: Cash, comparator?: Comparator ) {

  return this.next ( comparator, true );

};
