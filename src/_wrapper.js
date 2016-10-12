// @echo header
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    root.cash = root.$ = factory();
  }
})(this, function() {

  var doc        = document,
      win        = window,
      ArrayProto = Array.prototype,
      slice      = ArrayProto.slice,
      filter     = ArrayProto.filter,
      push       = ArrayProto.push;

  // @include ./core.js
  // @include ./util.js
  // @include ./data.js
  // @include ./attributes.js
  // @include ./collection.js
  // @include ./css.js
  // @include ./dimensions.js
  // @include ./events.js
  // @include ./forms.js
  // @include ./manipulation.js
  // @include ./offset.js
  // @include ./traversal.js

  return cash;
});
