
// @require core/index.js

each ( ['width', 'height'], prop => {

  fn[prop] = function ( value ) {

    if ( !this[0] ) return value === undefined ? undefined : this;

    if ( isNumeric ( value ) ) {

      this[0].style[prop] = `${value}px`;

    } else if ( isString ( value ) ) {

      this[0].style[prop] = value;

    } else {

      return this[0].getBoundingClientRect ()[prop];

    }

    return this;

  };

});
