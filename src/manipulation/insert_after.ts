
// @require core/cash.ts
// @require collection/each.ts

interface Cash {
  insertAfter ( selector: Selector ): this;
}

Cash.prototype.insertAfter = function ( this: Cash, selector: Selector ) {

  cash ( selector ).each ( ( index: number, ele: HTMLElement ) => {

    const parent = ele.parentNode;

    if ( parent ) {
      this.each ( ( i, e ) => {
        parent.insertBefore ( !index ? e : e.cloneNode ( true ), ele.nextSibling );
      });
    }

  });

  return this;

};
