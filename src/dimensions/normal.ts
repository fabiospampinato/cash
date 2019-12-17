
// @require core/camel_case.ts
// @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require core/variables.ts
// @require css/helpers/compute_style.ts
// @require css/helpers/get_suffixed_value.ts
// @require ./helpers/get_extra_space.ts

interface Cash {
  width (): number;
  width ( value: number | string ): this;
  height (): number;
  height ( value: number | string ): this;
}

each ( ['width', 'height'], ( index: number, prop: 'width' | 'height' ) => {

  fn[prop] = function ( this: Cash, value?: number | string ) {

    if ( !this[0] ) return isUndefined ( value ) ? undefined : this;

    if ( !arguments.length ) {

      if ( isWindow ( this[0] ) ) return this[0][ camelCase ( `outer-${prop}` )];

      return this[0].getBoundingClientRect ()[prop] - getExtraSpace ( this[0], !index );

    }

    const valueNumber = parseInt ( value, 10 );

    return this.each ( ( i, ele ) => {

      if ( !isElement ( ele ) ) return;

      const boxSizing = computeStyle ( ele, 'boxSizing' );

      ele.style[prop] = getSuffixedValue ( prop, valueNumber + ( boxSizing === 'border-box' ? getExtraSpace ( ele, !index ) : 0 ) );

    });

  };

});
