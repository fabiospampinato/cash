
// @require core/cash.ts
// @require core/type_checking.ts
// @require css/helpers/compute_style.ts
// @require ./helpers/get_default_display.ts
// @require ./helpers/is_hidden.ts
// @require ./helpers/variables.ts

interface Cash {
  toggle ( force?: boolean ): this;
}

fn.toggle = function ( this: Cash, force?: boolean ) {

  return this.each ( ( i, ele ) => {

    if ( !isElement ( ele ) ) return;

    const hidden = isHidden ( ele );
    const show = isUndefined ( force ) ? hidden : force;

    if ( show ) {

      ele.style.display = ele[displayProperty] || '';

      if ( isHidden ( ele ) ) {

        ele.style.display = getDefaultDisplay ( ele.tagName );

      }

    } else if ( !hidden ) {

      ele[displayProperty] = computeStyle ( ele, 'display' );

      ele.style.display = 'none';

    }

  });

};
