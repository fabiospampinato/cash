
// @require core/cash.ts
// @require core/filtered.ts
// @require events/off.ts
// @require ./detach.ts

interface Cash {
  remove ( comparator?: Comparator ): this;
}

fn.remove = function ( this: Cash, comparator?: Comparator ) {

  filtered ( this, comparator ).detach ().off ();

  return this;

};
