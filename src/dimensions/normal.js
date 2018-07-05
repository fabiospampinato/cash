
// @require core/camel_case.js
// @require core/cash.js
// @require core/each.js
// @require core/variables.js
// @require css/helpers/compute_style.js
// @require css/helpers/get_suffixed_value.js
// @require ./helpers/get_extra_space.js

each ( ['width', 'height'], ( prop, index ) => {

  fn[prop] = function ( value ) {

    if ( !this[0] ) return value === undefined ? undefined : this;

    if ( !arguments.length ) {

      if ( this[0] === win ) return this[0][ camelCase ( `outer-${prop}` )];

      return this[0].getBoundingClientRect ()[prop] - getExtraSpace ( this[0], !index );

    }

    value = parseInt ( value, 10 );

    return this.each ( ( i, ele ) => {

      if ( ele.nodeType !== 1 ) return;

      const boxSizing = computeStyle ( ele, 'boxSizing' );

      ele.style[prop] = getSuffixedValue ( prop, value + ( boxSizing === 'border-box' ? getExtraSpace ( ele, !index ) : 0 ) );

    });

  };

});
