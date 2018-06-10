
// @require core/cash.js
// @require core/type_checking.js
// @require collection/each.js
// @require ./remove_attr.js

fn.attr = function ( attr, value ) {

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

  for ( let key in attr ) {

    this.attr ( key, attr[key] );

  }

  return this;

};
