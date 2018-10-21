
// @require core/cash.ts
// @require core/unique.ts
// @require collection/each.ts

fn.parent = function () {

  const result = [];

  this.each ( ( i, ele ) => {
    if ( ele && ele.parentNode ) {
      result.push ( ele.parentNode );
    }
  });

  return cash ( unique ( result ) );

};
