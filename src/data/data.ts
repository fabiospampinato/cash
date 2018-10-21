
// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/get_data.ts
// @require ./helpers/set_data.ts
// @require ./helpers/variables.ts

fn.data = function ( name, value ) {

  if ( !name ) {

    if ( !this[0] ) return;

    each ( this[0].attributes, attr => {

      const match = attr.name.match ( dataAttributeRe );

      if ( !match ) return;

      this.data ( match[1] );

    });

    return getData ( this[0] );

  }

  if ( isString ( name ) ) {

    if ( value === undefined ) return this[0] && getData ( this[0], name );

    return this.each ( ( i, ele ) => setData ( ele, name, value ) );

  }

  for ( let key in name ) {

    this.data ( key, name[key] );

  }

  return this;

};
