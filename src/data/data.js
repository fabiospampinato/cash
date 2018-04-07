
// @require collection/each.js
// @require ./helpers/get_data.js
// @require ./helpers/set_data.js

fn.data = function ( name, value ) {

  if ( isString ( name ) ) {

    return value === undefined
             ? ( this[0] ? getData ( this[0], name ) : undefined )
             : this.each ( ele => { setData ( ele, name, value ) } );

  }

  for ( let key in name ) {
    this.data ( key, name[key] );
  }

  return this;

};
