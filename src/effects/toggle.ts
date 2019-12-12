
// @require core/cash.ts
// @require core/type_checking.ts
// @require ./helpers/get_default_display.ts

interface Cash {
  toggle ( force?: boolean ): this;
}

fn.toggle = function ( this: Cash, force?: boolean ) {

  return this.each ( ( i, ele ) => {

    const show = isUndefined ( force ) ? isHidden ( ele ) : force;

    if ( show ) {

      ele.style.display = '';

      if ( isHidden ( ele ) ) {

        ele.style.display = getDefaultDisplay ( ele.tagName );

      }

    } else {

      ele.style.display = 'none';

    }

  });

};
