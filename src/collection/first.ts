
// @require core/cash.ts
// @require ./eq.ts

interface Cash {
  first (): Cash;
}

fn.first = function ( this: Cash ) {

  return this.eq ( 0 );

};
