
// @require ./next.ts

interface Cash {
  nextAll ( comparator?: Comparator): Cash;
}

fn.nextAll = function ( this: Cash, comparator?: Comparator ) {

  return this.next ( comparator, true );

};
