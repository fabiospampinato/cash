
// @require core/cash.ts
// @require collection/each.ts
// @require ./helpers/insert_element.ts

interface Cash {
  insertBefore ( selector: Selector ): this;
}

Cash.prototype.insertBefore = function ( this: Cash, selector: Selector ) {

  cash ( selector ).each ( ( index: number, ele: Ele ) => {

    const parent = ele.parentNode;

    if ( parent ) {
      this.each ( ( i, e ) => {
        insertElement ( parent, !index ? e : e.cloneNode ( true ), true, ele );
      });
    }

  });

  return this;

};
