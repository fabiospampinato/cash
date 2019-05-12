
// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts

interface Cash {
  html (): string;
  html ( html: string ): this;
}

function html ( this: Cash ): string;
function html ( this: Cash, html: string ): Cash;
function html ( this: Cash, html?: string ): string | Cash {

  if ( html === undefined ) return this[0] && this[0].innerHTML;

  return this.each ( ( i, ele ) => {

    if ( !isElement ( ele ) ) return;

    ele.innerHTML = html;

  });

}

Cash.prototype.html = html;
