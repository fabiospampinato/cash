
// @require core/index.js
// @require ./helpers/get_value.js
// @require ./helpers/query_encode.js

fn.serialize = function () {

  if ( !this[0] ) return '';

  let query = '';

  each ( this[0].elements || this, ele => {

    if ( ele.disabled || ele.tagName === 'FIELDSET' ) return;

    switch ( ele.type.toLowerCase () ) {
      case 'file':
      case 'reset':
      case 'submit':
      case 'button':
        break;
      default:
        const value = getValue ( ele );
        if ( value !== null ) {
          const name = ele.name;
          const values = isArray ( value ) ? value : [value];
          each ( values, value => {
            query += queryEncode ( name, value );
          });
        }
    }

  });

  return query.substr ( 1 );

};
