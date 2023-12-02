
// @require core/cash.ts
// @require collection/each.ts

interface Cash {
  empty (): this;
}

fn.empty = function ( this: Cash ) {

  return each ( this, ( i, ele ) => {

    while ( ele.firstChild ) {

      ele.removeChild ( ele.firstChild );

    }

  });

};
