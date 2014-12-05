function compute(el, prop) {
  return parseInt(win.getComputedStyle(el[0], null)[prop], 10);
}

fn.extend({

  height() {
    return this[0].getBoundingClientRect().height;
  },

  innerWidth() {
    return this[0].clientWidth;
  },

  innerHeight() {
    return this[0].clientHeight;
  },

  outerWidth(margins) {
    if (margins === true) {
      return this[0].offsetWidth +
        (compute(this, 'margin-left')  || compute(this, 'marginLeft')  || 0) +
        (compute(this, 'margin-right') || compute(this, 'marginRight') || 0);
    }

    return this[0].offsetWidth;
  },

  outerHeight(margins) {
    if (margins === true) {
      return this[0].offsetHeight +
        (compute(this, 'margin-top') || compute(this, 'marginTop') || 0) +
        (compute(this, 'margin-bottom') || compute(this, 'marginBottom') || 0);
    }

    return this[0].offsetHeight;
  },

  width() {
    return this[0].getBoundingClientRect().width;
  }

});
