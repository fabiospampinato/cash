
// @require core/cash.ts
// @require collection/first.ts
// @require manipulation/append_to.ts
// @require manipulation/before.ts

interface Cash {
  wrapAll ( selector?: Selector ): this;
}

fn.wrapAll = function ( this: Cash, selector?: Selector ) {

  let structure = cash ( selector );
  let wrapper: Element = structure[0];

  while ( wrapper.children.length ) wrapper = wrapper.firstElementChild;

  this.first ().before ( structure );

  return this.appendTo ( wrapper );

};
