
// @require core/cash.ts
// @require collection/each.ts

interface Cash {
  insertBefore ( selector: Selector ): this;
}

Cash.prototype.insertBefore = function ( this: Cash, selector: Selector ) {

  cash ( selector ).each ( ( index: number, ele: HTMLElement ) => {

    const parent = ele.parentNode;

    if ( parent ) {
      this.each ( ( i, e ) => {
        parent.insertBefore ( !index ? e : e.cloneNode ( true ), ele );
      });
    }

  });

  return this;

};
