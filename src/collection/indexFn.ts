
// @require core/cash.ts
// @require core/variables.ts
// @require traversal/children.ts
// @require traversal/parent.ts
// @require ./get.ts

//FIXME Ugly file name, is there a better option?

fn.index = function ( ele ) {

  const child = ele ? cash ( ele )[0] : this[0],
        collection = ele ? this : cash ( child ).parent ().children ();

  return indexOf.call ( collection, child );

};
