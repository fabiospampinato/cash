
// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts

each ( ['Width', 'Height'], prop => {

  fn[`inner${prop}`] = function () {

    if ( !this[0] ) return;

    if ( this[0] === win ) return win[`inner${prop}`];

    return this[0][`client${prop}`];

  };

});
