
// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/variables.ts

interface Cash {
  prop ( prop: string ): any;
  prop ( prop: string, value: any ): this;
  prop ( props: Record<string, any> ): this;
}

fn.prop = function ( this: Cash, prop: string | Record<string, any>, value?: any ) {

  if ( !prop ) return;

  if ( isString ( prop ) ) {

    prop = propMap[prop] || prop;

    if ( arguments.length < 2 ) return this[0] && this[0][prop];

    return this.each ( ( i, ele ) => { ele[prop] = value } );

  }

  for ( const key in prop ) {

    this.prop ( key, prop[key] );

  }

  return this;

};
