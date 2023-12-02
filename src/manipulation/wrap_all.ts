
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
  let t: Element | undefined;

  while ( t = wrapper.firstElementChild ) wrapper = t;

  this.first ().before ( structure );

  return this.appendTo ( wrapper );

};
