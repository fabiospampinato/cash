
// @require core/cash.ts
// @require core/variables.ts
// @require traversal/children.ts
// @require traversal/parent.ts
// @require ./get.ts

interface Cash {
  index ( selector?: Selector ): number;
}

fn.index = function ( this: Cash, selector?: Selector ) {

  const child = selector ? cash ( selector )[0] : this[0];
  const collection = selector ? this : cash ( child ).parent ().children ();

  return indexOf.call ( collection, child );

};
