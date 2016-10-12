;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    root.cash = root.$ = factory();
  }
})(this, function() {

  "use strict";

  var doc        = document,
      win        = window,
      ArrayProto = Array.prototype,
      slice      = ArrayProto.slice,
      filter     = ArrayProto.filter,
      push       = ArrayProto.push;

