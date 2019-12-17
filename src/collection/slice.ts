
// @require core/cash.ts
// @require core/variables.ts

interface Cash {
  slice ( start?: number, end?: number ): Cash;
}

fn.slice = function ( this: Cash, start?: number, end?: number ) {

  return cash ( slice.call ( this, start, end ) );

};
