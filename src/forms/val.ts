
// @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/get_value.ts

fn.val = function ( value ) {

  if ( value === undefined ) return this[0] && getValue ( this[0] );

  return this.each ( ( i, ele ) => {

    const isMultiple = selectMultipleRe.test ( ele.type ),
          eleValue = ( value === null ) ? ( isMultiple ? [] : '' ) : value;

    if ( isMultiple && isArray ( eleValue ) ) {

      each ( ele.options, option => {

        option.selected = eleValue.indexOf ( option.value ) >= 0;

      });

    } else {

      ele.value = eleValue;

    }

  });

};
