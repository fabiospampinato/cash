
// @require core/camel_case.ts
// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts
// @require css/helpers/compute_style.ts
// @require css/helpers/get_suffixed_value.ts
// @require ./helpers/get_extra_space.ts

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
