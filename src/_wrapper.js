
(function () {

  'use strict';

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

  window.cash = window.$ = cash;

})();
