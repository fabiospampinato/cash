
// @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require ./helpers/get_value.ts
// @require ./helpers/query_encode.ts

const skippableRe = /file|reset|submit|button|image/i,
      checkableRe = /radio|checkbox/i;

interface Cash {
  serialize (): string;
}

Cash.prototype.serialize = function ( this: Cash ) {

  let query = '';

  this.each ( ( i, ele ) => {

    each ( ele.elements || [ele], ( i, ele ) => {

      if ( ele.disabled || !ele.name || ele.tagName === 'FIELDSET' || skippableRe.test ( ele.type ) || ( checkableRe.test ( ele.type ) && !ele.checked ) ) return;

      const value = getValue ( ele );

      if ( value === undefined ) return;

      const values = isArray ( value ) ? value : [value];

      each ( values, ( i, value ) => {
        query += queryEncode ( ele.name, value );
      });

    });

  });

  return query.substr ( 1 );

};
