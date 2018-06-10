
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

    if ( !prop ) return this;

    value = getSuffixedValue ( prop, value );

    return this.each ( ( i, ele ) => {

      if ( ele.nodeType !== 1 ) return;

      ele.style[prop] = value;

    });

  }

  for ( let key in prop ) {

    this.css ( key, prop[key] );

  }

  return this;

};
