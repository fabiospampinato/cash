
// @require core/cash.js
// @require core/each.js
// @require core/type_checking.js
// @require collection/each.js
// @require ./helpers/get_value.js

fn.val = function ( value ) {

  if ( value === undefined ) return this[0] && getValue ( this[0] );

  if ( value === null ) value = '';

  return this.each ( ( i, ele ) => {

    if ( selectMultipleRe.test ( ele.type ) && isArray ( value ) ) {

      each ( ele.options, option => {

        option.selected = value.indexOf ( option.value ) >= 0;

      });

    } else {

      ele.value = value;

    }

  });

};
