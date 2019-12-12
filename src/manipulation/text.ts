
// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts

interface Cash {
  text (): string;
  text ( text: string ): this;
}

function text ( this: Cash ): string;
function text ( this: Cash, text: string ): Cash;
function text ( this: Cash, text?: string ) {

  if ( isUndefined ( text ) ) return this[0] ? this[0].textContent : '';

  return this.each ( ( i, ele ) => { ele.textContent = text } );

};

fn.text = text;
