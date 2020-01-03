
// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./remove_attr.ts

interface Cash {
  attr (): undefined;
  attr ( attrs: string ): string | null;
  attr ( attrs: string, value: string ): this;
  attr ( attrs: Record<string, string> ): this;
}

function attr ( this: Cash ): undefined;
function attr ( this: Cash, attr: string ): string | null;
function attr ( this: Cash, attr: string, value: string ): Cash;
function attr ( this: Cash, attr: Record<string, string> ): Cash;
function attr ( this: Cash, attr?: string | Record<string, string>, value?: string ) {

  if ( !attr ) return;

  if ( isString ( attr ) ) {

    if ( arguments.length < 2 ) {

      if ( !this[0] || !isElement ( this[0] ) ) return;

      const value = this[0].getAttribute ( attr );

      return isNull ( value ) ? undefined : value;

    }

    if ( isUndefined ( value ) ) return this;

    if ( isNull ( value ) ) return this.removeAttr ( attr );

    return this.each ( ( i, ele ) => {

      if ( !isElement ( ele ) ) return;

      ele.setAttribute ( attr, value )

    });

  }

  for ( const key in attr ) {

    this.attr ( key, attr[key] );

  }

  return this;

}

fn.attr = attr;
