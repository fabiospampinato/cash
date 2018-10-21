
// @require core/cash.ts
// @require collection/each.ts
// @require collection/slice.ts
// @require ./after.ts
// @require ./remove.ts

interface Cash {
  replaceWith ( selector: Selector ): this;
}

Cash.prototype.replaceWith = function ( this: Cash, selector: Selector ) {

  return this.each ( ( i, ele ) => {

    const parent = ele.parentNode;

    if ( !parent ) return;

    const $eles = i ? cash ( selector ).clone () : cash ( selector );

    if ( !$eles[0] ) {
      this.remove ();
      return false;
    }

    parent.replaceChild ( $eles[0], ele );

    cash ( $eles[0] ).after ( $eles.slice ( 1 ) );

  });

};
