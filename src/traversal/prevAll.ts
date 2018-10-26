
// @require ./prev.ts

interface Cash {
  prevAll ( comparator?: Comparator ): Cash;
}

Cash.prototype.prevAll = function ( this: Cash, comparator?: Comparator ) {

  return this.prev ( comparator, true );

};
