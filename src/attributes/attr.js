
// @require collection/each.js

fn.attr = function ( attr, value ) {

  if ( !attr || !this[0] ) return;

  if ( isString ( attr ) ) {

    if ( value === undefined ) {

      return this[0].getAttribute ? this[0].getAttribute ( attr ) : this[0][attr];

    }

    return this.each ( ( i, ele ) => {
      if ( ele.setAttribute ) {
        ele.setAttribute ( attr, value );
      } else {
        ele[attr] = value;
      }
    });

  }

  for ( let key in attr ) {
    this.attr ( key, attr[key] );
  }

  return this;

};
