
// @require core/cash.js
// @require core/each.js
// @require css/helpers/compute_style.js
// @require css/helpers/get_suffixed_value.js
// @require ./helpers/get_extra_space.js

each ( ['width', 'height'], ( prop, index ) => {

  fn[prop] = function ( value ) {

    if ( !this[0] ) return value === undefined ? undefined : this;

    if ( !arguments.length ) return this[0].getBoundingClientRect ()[prop] - getExtraSpace ( this[0], !index );

    value = parseInt ( value, 10 );

    return this.each ( ( i, ele ) => {

      const boxSizing = computeStyle ( ele, 'boxSizing' );

      ele.style[prop] = getSuffixedValue ( prop, value + ( boxSizing === 'border-box' ? getExtraSpace ( ele, !index ) : 0 ) );

    });

  };

});
