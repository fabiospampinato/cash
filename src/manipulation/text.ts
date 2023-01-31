
// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require collection/get.ts

interface Cash {
  text (): string;
  text ( text: string ): this;
}

function text ( this: Cash ): string;
function text ( this: Cash, text: string ): Cash;
function text ( this: Cash, text?: string ) {

  if ( isUndefined ( text ) ) {

    return this.get ().map ( ele => isElement ( ele ) || isText ( ele ) ? ele.textContent : '' ).join ( '' );

  }

  return this.each ( ( i, ele ) => {

    if ( !isElement ( ele ) ) return;

    ele.textContent = text;

  });

}

fn.text = text;
