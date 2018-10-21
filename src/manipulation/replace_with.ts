
// @require core/cash.ts
// @require collection/each.ts
// @require collection/slice.ts
// @require ./after.ts
// @require ./remove.ts

fn.replaceWith = function ( content ) {

  return this.each ( ( i, ele ) => {

    const parent = ele.parentNode;

    if ( !parent ) return;

    const $eles = i ? cash ( content ).clone () : cash ( content );

    if ( !$eles[0] ) {
      this.remove ();
      return false;
    }

    parent.replaceChild ( $eles[0], ele );

    cash ( $eles[0] ).after ( $eles.slice ( 1 ) );

  });

};
