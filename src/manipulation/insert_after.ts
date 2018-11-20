
// @require core/cash.ts
// @require collection/each.ts
// @require ./helpers/insert_element.ts

interface Cash {
  insertAfter ( selector: Selector ): this;
}

Cash.prototype.insertAfter = function ( this: Cash, selector: Selector ) {

  cash ( selector ).each ( ( index: number, ele: HTMLElement ) => {

    const parent = ele.parentNode;

    if ( parent ) {
      this.each ( ( i, e ) => {
        insertElement ( parent, !index ? e : e.cloneNode ( true ), true, ele.nextSibling );
      });
    }

  });

  return this;

};
