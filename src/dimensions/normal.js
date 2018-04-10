
// @require css/css.js

each ( ['width', 'height'], prop => {

  fn[prop] = function ( value ) {

    if ( !this[0] ) return value === undefined ? undefined : this;

    if ( !arguments.length ) return this[0].getBoundingClientRect ()[prop];

    return this.css ( prop, value );

  };

});
