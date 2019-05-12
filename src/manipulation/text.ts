
// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts

interface Cash {
  text (): string;
  text ( text: string ): this;
}

function text ( this: Cash ): string;
function text ( this: Cash, text: string ): Cash;
function text ( this: Cash, text?: string ): string | Cash {

  if ( text === undefined ) return this[0] ? this[0].textContent : '';

  return this.each ( ( i, ele ) => {

    if ( !isElement ( ele ) ) return;

    ele.textContent = text;

  });

};

Cash.prototype.text = text;
