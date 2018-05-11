
// @require collection/each.js
// @require ./helpers/get_prefixed_prop.js
// @require ./helpers/get_suffixed_value.js

fn.css = function ( prop, value ) {

  if ( isString ( prop ) ) {

    prop = prefixedProp ( prop );
    value = arguments.length > 1 ? getSuffixedValue ( prop, value ) : value;

    return arguments.length > 1
             ? this.each ( ( i, ele ) => { ele.style[prop] = value } )
             : this[0] ? win.getComputedStyle ( this[0] )[prop] : undefined;

  }

  for ( let key in prop ) {
    this.css ( key, prop[key] );
  }

  return this;

};
