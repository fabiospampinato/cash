
// @require core/cash.ts
// @require collection/each.ts

interface Cash {
  removeProp ( prop: string ): this;
}

fn.removeProp = function ( this: Cash, prop: string ) {

  return this.each ( ( i, ele ) => { delete ele[prop] } );

};
