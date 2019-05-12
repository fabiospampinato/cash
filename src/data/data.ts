
// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/get_data.ts
// @require ./helpers/set_data.ts
// @require ./helpers/variables.ts

interface Cash {
  data (): plainObject | undefined;
  data ( name: string ): any;
  data ( name: string, value: any ): this;
  data ( datas: plainObject ): this;
}

function data ( this: Cash ): plainObject | undefined;
function data ( this: Cash, name: string ): any;
function data ( this: Cash, name: string, value: any ): Cash;
function data ( this: Cash, name: plainObject ): Cash;
function data ( this: Cash, name?: string | plainObject, value?: any ) {

  if ( !name ) {

    if ( !this[0] ) return;

    const datas: { [data: string]: any } = {};

    each ( this[0].attributes, ( i, attr ) => {

      const match = attr.name.match ( dataAttributeRe );

      if ( !match ) return;

      datas[match[1]] = this.data ( match[1] );

    });

    return datas;

  }

  if ( isString ( name ) ) {

    if ( value === undefined ) return this[0] && getData ( this[0], name );

    return this.each ( ( i, ele ) => setData ( ele, name, value ) );

  }

  for ( const key in name ) {

    this.data ( key, name[key] );

  }

  return this;

}

Cash.prototype.data = data;
