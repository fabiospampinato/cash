
// @require core/index.js

each ( ['width', 'height'], prop => {

  fn[prop] = function ( value ) {

    if ( !this[0] ) return value === undefined ? undefined : this;

    if ( !arguments.length ) return this[0].getBoundingClientRect ()[prop];

    return this.each ( ( i, ele ) => {

      ele.style[prop] = isNumeric ( value ) ? `${value}px` : value;

    });

  };

});
