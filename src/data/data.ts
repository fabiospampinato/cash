
// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/get_data.ts
// @require ./helpers/set_data.ts
// @require ./helpers/variables.ts

interface Cash {
  data (): plainObject | undefined;
  data ( name: string );
  data ( name: string, value ): this;
  data ( datas: plainObject ): this;
}

function data ( this: Cash ): plainObject | undefined;
function data ( this: Cash, name: string );
function data ( this: Cash, name: string, value ): Cash;
function data ( this: Cash, name: plainObject ): Cash;
function data ( this: Cash, name?: string | plainObject, value? ) {

  if ( !name ) {

    if ( !this[0] ) return;

    const datas = {};

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

  for ( let key in name ) {

    this.data ( key, name[key] );

  }

  return this;

}

Cash.prototype.data = data;
