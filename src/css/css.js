
// @require core/cash.js
// @require core/type_checking.js
// @require collection/each.js
// @require ./helpers/compute_style.js
// @require ./helpers/get_prefixed_prop.js
// @require ./helpers/get_suffixed_value.js

fn.css = function ( prop, value ) {

  if ( isString ( prop ) ) {

    prop = getPrefixedProp ( prop );

    if ( arguments.length < 2 ) return this[0] && computeStyle ( this[0], prop );

    value = getSuffixedValue ( prop, value );

    return this.each ( ( i, ele ) => { ele.style[prop] = value } );

  }

  for ( let key in prop ) {

    this.css ( key, prop[key] );

  }

  return this;

};
