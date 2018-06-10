
// @require core/cash.js
// @require core/type_checking.js
// @require collection/each.js
// @require ./helpers/compute_style.js
// @require ./helpers/get_prefixed_prop.js
// @require ./helpers/get_suffixed_value.js
// @require ./helpers/is_css_variable.js

fn.css = function ( prop, value ) {

  if ( isString ( prop ) ) {

    const isVariable = isCSSVariable ( prop );

    prop = getPrefixedProp ( prop, isVariable );

    if ( arguments.length < 2 ) return this[0] && computeStyle ( this[0], prop, isVariable );

    if ( !prop ) return this;

    value = getSuffixedValue ( prop, value, isVariable );

    return this.each ( ( i, ele ) => {

      if ( ele.nodeType !== 1 ) return;

      if ( isVariable ) {

        ele.style.setProperty ( prop, value );

      } else {

        ele.style[prop] = value;

      }

    });

  }

  for ( let key in prop ) {

    this.css ( key, prop[key] );

  }

  return this;

};
