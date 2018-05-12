
// @require collection/each.js

fn.attr = function ( attr, value ) {

  if ( !attr || !this[0] ) return;

  if ( isString ( attr ) ) {

    if ( value === undefined ) return this[0].getAttribute ( attr );

    return this.each ( ( i, ele ) => ele.setAttribute ( attr, value ) );

  }

  for ( let key in attr ) {
    this.attr ( key, attr[key] );
  }

  return this;

};
