
// @require core/cash.ts
// @require ./eq.ts

interface Cash {
  last (): Cash;
}

fn.last = function ( this: Cash ) {

  return this.eq ( -1 );

};
