
// @require core/cash.js
// @require core/variables.js
// @require traversal/children.js
// @require traversal/parent.js
// @require ./get.js

//FIXME Ugly file name, is there a better option?

fn.index = function ( ele ) {

  const child = ele ? cash ( ele )[0] : this[0],
        collection = ele ? this : cash ( child ).parent ().children ();

  return indexOf.call ( collection, child );

};
