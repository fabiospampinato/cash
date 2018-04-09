
// @require collection/each.js

fn.prop = function ( prop, value ) {

  if ( isString ( prop ) ) {

    return value === undefined
             ? ( this[0] ? this[0][prop] : undefined )
             : this.each ( ( i, ele ) => { ele[prop] = value } );

  }

  for ( let key in prop ) {
    this.prop ( key, prop[key] );
  }

  return this;

};
