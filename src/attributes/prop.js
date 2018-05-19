
// @require core/cash.js
// @require core/type_checking.js
// @require collection/each.js

fn.prop = function ( prop, value ) {

  if ( !prop ) return;

  if ( isString ( prop ) ) {

    if ( arguments.length < 2 ) return this[0] && this[0][prop];

    return this.each ( ( i, ele ) => { ele[prop] = value } );

  }

  for ( let key in prop ) {

    this.prop ( key, prop[key] );

  }

  return this;

};
