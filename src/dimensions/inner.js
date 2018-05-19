
// @require core/cash.js
// @require core/each.js

each ( ['Width', 'Height'], prop => {

  fn[`inner${prop}`] = function () {
    return this[0] && this[0][`client${prop}`];
  };

});
