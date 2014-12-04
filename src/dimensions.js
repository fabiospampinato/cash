cash.fn.extend({

  height: function() {
    return this[0].getBoundingClientRect().height;
  },

  innerWidth: function() {
    return this[0].clientWidth;
  },

  innerHeight: function() {
    return this[0].clientHeight;
  },

  outerWidth: function(margins) {
    if (margins === true) {
      return this[0].offsetWidth +
        (parseInt(getComputed(this, 'margin-left'), 10) || parseInt(getComputed(this, 'marginLeft'), 10) || 0) +
        (parseInt(getComputed(this, 'margin-right'), 10) || parseInt(getComputed(this, 'marginRight'), 10) || 0);
    }
    return this[0].offsetWidth;
  },

  outerHeight: function(margins) {
    if (margins === true) {
      return this[0].offsetHeight +
        (parseInt(getComputed(this, 'margin-top'), 10) || parseInt(getComputed(this, 'marginTop'), 10) || 0) +
        (parseInt(getComputed(this, 'margin-bottom'), 10) || parseInt(getComputed(this, 'marginBottom'), 10) || 0);
    }
    return this[0].offsetHeight;
  },

  width: function() {
    return this[0].getBoundingClientRect().width;
  }

});

function getComputed(el, prop) {
  var computed;
  computed = win.getComputedStyle(el[0], null);
  return computed[prop];
}
