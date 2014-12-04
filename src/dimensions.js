function compute(el, prop) {
  return parseInt(win.getComputedStyle(el[0], null)[prop], 10);
}

fn.extend({

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
        (compute(this, 'margin-left')  || compute(this, 'marginLeft')  || 0) +
        (compute(this, 'margin-right') || compute(this, 'marginRight') || 0);
    }

    return this[0].offsetWidth;
  },

  outerHeight: function(margins) {
    if (margins === true) {
      return this[0].offsetHeight +
        (compute(this, 'margin-top') || compute(this, 'marginTop') || 0) +
        (compute(this, 'margin-bottom') || compute(this, 'marginBottom') || 0);
    }

    return this[0].offsetHeight;
  },

  width: function() {
    return this[0].getBoundingClientRect().width;
  }

});
