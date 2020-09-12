
// @require core/cash.ts
// @require core/each.ts

interface Cash {
  each ( callback: EachArrayCallback<EleLoose> ): this;
}

fn.each = function ( this: Cash, callback: EachArrayCallback<EleLoose> ) {

  return each ( this, callback );

};
