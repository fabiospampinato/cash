
// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/get_data.ts
// @require ./helpers/set_data.ts

interface Cash {
  data (): Record<string, any> | undefined;
  data ( name: string ): any;
  data ( name: string, value: any ): this;
  data ( datas: Record<string, any> ): this;
}

function data ( this: Cash ): Record<string, any> | undefined;
function data ( this: Cash, name: string ): any;
function data ( this: Cash, name: string, value: any ): Cash;
function data ( this: Cash, name: Record<string, any> ): Cash;
function data ( this: Cash, name?: string | Record<string, any>, value?: any ) {

  if ( !name ) {

    if ( !this[0] ) return;

    const datas: { [data: string]: any } = {};

    for ( const key in this[0].dataset ) {

      datas[key] = getData ( this[0], key );

    }

    return datas;

  }

  if ( isString ( name ) ) {

    if ( arguments.length < 2 ) return this[0] && getData ( this[0], name );

    if ( isUndefined ( value ) ) return this;

    return this.each ( ( i, ele ) => { setData ( ele, name, value ) } );

  }

  for ( const key in name ) {

    this.data ( key, name[key] );

  }

  return this;

}

fn.data = data;
