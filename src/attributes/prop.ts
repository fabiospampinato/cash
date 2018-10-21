
// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts

interface Cash {
  prop ( prop: string );
  prop ( prop: string, value ): this;
  prop ( props: plainObject ): this;
}

Cash.prototype.prop = function ( this: Cash, prop: string | plainObject, value? ) {

  if ( !prop ) return;

  if ( isString ( prop ) ) {

    if ( arguments.length < 2 ) return this[0] && this[0][prop];

    return this.each ( ( i, ele ) => { ele[prop] = value } );

  }

  for ( let key in prop ) {

    this.prop ( key, prop[key] );

  }

  return this;

};
