
// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require manipulation/append.ts
// @require manipulation/empty.ts

interface Cash {
  html (): string;
  html ( html: string ): this;
}

function html ( this: Cash ): string;
function html ( this: Cash, html: string ): Cash;
function html ( this: Cash, html?: string ) {

  if ( !arguments.length ) return this[0] && this[0].innerHTML;

  if ( isUndefined ( html ) ) return this;

  const hasScript = /<script[\s>]/.test ( html );

  return this.each ( ( i, ele ) => {

    if ( !isElement ( ele ) ) return;

    if ( hasScript ) {

      cash ( ele ).empty ().append ( html );

    } else {

      ele.innerHTML = html;

    }

  });

}

fn.html = html;
