
// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./remove_attr.ts

interface Cash {
  attr ( attrs: string );
  attr ( attrs: string, value ): this;
  attr ( attrs: plainObject ): this;
}

function attr ( this: Cash, attr: string );
function attr ( this: Cash, attr: string, value ): Cash;
function attr ( this: Cash, attr: plainObject ): Cash;
function attr ( this: Cash, attr: string | plainObject, value? ) {

  if ( !attr ) return;

  if ( isString ( attr ) ) {

    if ( arguments.length < 2 ) {

      if ( !this[0] ) return;

      const value = this[0].getAttribute ( attr );

      return value === null ? undefined : value;

    }

    if ( value === null ) return this.removeAttr ( attr );

    return this.each ( ( i, ele ) => { ele.setAttribute ( attr, value ) } );

  }

  for ( const key in attr ) {

    this.attr ( key, attr[key] );

  }

  return this;

}

Cash.prototype.attr = attr;
