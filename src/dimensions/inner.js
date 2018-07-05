
// @require core/cash.js
// @require core/each.js
// @require core/variables.js

each ( ['Width', 'Height'], prop => {

  fn[`inner${prop}`] = function () {

    if ( !this[0] ) return;

    if ( this[0] === win ) return win[`inner${prop}`];

    return this[0][`client${prop}`];

  };

});
