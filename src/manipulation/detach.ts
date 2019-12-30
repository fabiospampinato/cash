
// @require core/cash.ts
// @require core/filtered.ts
// @require collection/each.ts

interface Cash {
  detach ( comparator?: Comparator ): this;
}

fn.detach = function ( this: Cash, comparator?: Comparator ) {

  filtered ( this, comparator ).each ( ( i, ele ) => {

    if ( ele.parentNode ) {

      ele.parentNode.removeChild ( ele );

    }

  });

  return this;

};
