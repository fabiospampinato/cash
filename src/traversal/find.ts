
// @require core/cash.ts
// @require core/pluck.ts
// @require core/unique.ts
// @require core/find.ts
// @require core/variables.ts

interface Cash {
  find ( selector: string ): Cash;
}

fn.find = function ( this: Cash, selector: string ) {

  return cash ( unique ( pluck ( this, ele => find ( selector, ele ) ) ) );

};
