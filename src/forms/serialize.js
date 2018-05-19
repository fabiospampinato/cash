
// @require core/cash.js
// @require core/each.js
// @require core/type_checking.js
// @require ./helpers/get_value.js
// @require ./helpers/query_encode.js

const skippableRe = /file|reset|submit|button/i,
      checkableRe = /radio|checkbox/i;

fn.serialize = function () {

  let query = '';

  if ( this[0] ) {

    each ( this[0].elements || this, ele => {

      if ( ele.disabled || ele.tagName === 'FIELDSET' ) return;

      if ( skippableRe.test ( ele.type ) ) return;

      if ( checkableRe.test ( ele.type ) && !ele.checked ) return;

      const value = getValue ( ele );

      if ( value ) {

        const values = isArray ( value ) ? value : [value];

        each ( values, value => {
          query += queryEncode ( ele.name, value );
        });

      }

    });

  }

  return query.substr ( 1 );

};
