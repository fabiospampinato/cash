
// @require core/cash.js
// @require core/type_checking.js
// @require collection/each.js

fn.attr = function ( attr, value ) {

  if ( !attr ) return;

  if ( isString ( attr ) ) {

    if ( arguments.length < 2 ) {

      if ( !this[0] ) return;

      const value = this[0].getAttribute ( attr );

      return value === null ? undefined : value;

    }

    return this.each ( ( i, ele ) => { ele.setAttribute ( attr, value ) } );

  }

  for ( let key in attr ) {

    this.attr ( key, attr[key] );

  }

  return this;

};
