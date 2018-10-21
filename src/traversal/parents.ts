
// @require core/cash.ts
// @require core/matches.ts
// @require core/unique.ts
// @require core/variables.ts
// @require collection/each.ts

fn.parents = function ( selector ) {

  const result = [];

  let last;

  this.each ( ( i, ele ) => {

    last = ele;

    while ( last && last.parentNode && last !== doc.body.parentNode ) {

      last = last.parentNode;

      if ( !selector || ( selector && matches ( last, selector ) ) ) {
        result.push ( last );
      }

    }

  });

  return cash ( unique ( result ) );

};
