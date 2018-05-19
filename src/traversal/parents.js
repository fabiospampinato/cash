
// @require core/cash.js
// @require core/matches.js
// @require core/unique.js
// @require core/variables.js
// @require collection/each.js

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
