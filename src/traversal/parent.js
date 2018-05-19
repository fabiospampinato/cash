
// @require core/cash.js
// @require core/unique.js
// @require collection/each.js

fn.parent = function () {

  const result = [];

  this.each ( ( i, ele ) => {
    if ( ele && ele.parentNode ) {
      result.push ( ele.parentNode );
    }
  });

  return cash ( unique ( result ) );

};
