
// @require core/cash.js
// @require core/each.js
// @require core/type_checking.js
// @require collection/each.js
// @require ./helpers/get_value.js

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
