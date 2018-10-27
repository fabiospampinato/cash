
// @require core/cash.ts
// @require collection/first.ts
// @require manipulation/append_to.ts

interface Cash {
  wrapAll ( selector?: Selector ): this;
}

Cash.prototype.wrapAll = function ( this: Cash, selector?: Selector ) {

  if ( this[0] ) {

    const structure = cash ( selector );

    this.first ().before ( structure );

    let wrapper = structure[0] as Element;

    while ( wrapper.children.length ) wrapper = wrapper.firstElementChild;

    this.appendTo ( wrapper );

  }

  return this;

};
