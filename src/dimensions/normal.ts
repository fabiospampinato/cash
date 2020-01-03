
// @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require core/variables.ts
// @require css/helpers/compute_style.ts
// @require css/helpers/get_suffixed_value.ts
// @require ./helpers/get_extra_space.ts
// @require ./helpers/get_document_dimension.ts

interface Cash {
  width (): number;
  width ( value: number | string ): this;
  height (): number;
  height ( value: number | string ): this;
}

each ( ['Width', 'Height'], ( index: number, prop: 'Width' | 'Height' ) => {

  const propLC = prop.toLowerCase ();

  fn[propLC] = function ( this: Cash, value?: number | string ) {

    if ( !this[0] ) return isUndefined ( value ) ? undefined : this;

    if ( !arguments.length ) {

      if ( isWindow ( this[0] ) ) return this[0].document.documentElement[`client${prop}`];

      if ( isDocument ( this[0] ) ) return getDocumentDimension ( this[0], prop );

      return this[0].getBoundingClientRect ()[propLC] - getExtraSpace ( this[0], !index );

    }

    const valueNumber = parseInt ( value, 10 );

    return this.each ( ( i, ele ) => {

      if ( !isElement ( ele ) ) return;

      const boxSizing = computeStyle ( ele, 'boxSizing' );

      ele.style[propLC] = getSuffixedValue ( propLC, valueNumber + ( boxSizing === 'border-box' ? getExtraSpace ( ele, !index ) : 0 ) );

    });

  };

});
