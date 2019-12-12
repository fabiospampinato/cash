
// @require core/cash.ts
// @require core/each.ts

interface Cash {
  each ( callback: EachCallback<EleLoose> ): this;
}

fn.each = function ( this: Cash, callback: EachCallback<EleLoose> ) {

  return each ( this, callback );

};
