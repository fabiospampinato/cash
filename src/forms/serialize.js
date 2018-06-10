
// @require core/cash.js
// @require core/each.js
// @require core/type_checking.js
// @require ./helpers/get_value.js
// @require ./helpers/query_encode.js

const skippableRe = /file|reset|submit|button|image/i,
      checkableRe = /radio|checkbox/i;

fn.serialize = function () {

  let query = '';

  this.each ( ( i, ele ) => {

    each ( ele.elements || [ele], ele => {

      if ( ele.disabled || !ele.name || ele.tagName === 'FIELDSET' ) return;

      if ( skippableRe.test ( ele.type ) ) return;

      if ( checkableRe.test ( ele.type ) && !ele.checked ) return;

      const value = getValue ( ele );

      if ( value === undefined ) return;

      const values = isArray ( value ) ? value : [value];

      each ( values, value => {
        query += queryEncode ( ele.name, value );
      });

    });

  });

  return query.substr ( 1 );

};
