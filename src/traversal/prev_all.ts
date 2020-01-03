
// @require ./prev.ts

interface Cash {
  prevAll ( comparator?: Comparator ): Cash;
}

fn.prevAll = function ( this: Cash, comparator?: Comparator ) {

  return this.prev ( comparator, true );

};
