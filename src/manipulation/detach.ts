
// @require core/cash.ts
// @require collection/each.ts

interface Cash {
  detach (): this;
}

fn.detach = function ( this: Cash ) {

  return this.each ( ( i, ele ) => {

    if ( ele.parentNode ) {

      ele.parentNode.removeChild ( ele );

    }

  });

};
