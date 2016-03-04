function compute(el, prop) {
  return parseInt(win.getComputedStyle(el[0], null)[prop], 10) || 0;
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
    return this[0].offsetWidth + (margins !== true ? 0 :
        compute(this, 'marginLeft') + compute(this, 'marginRight') );
  },

  outerHeight(margins) {
    return this[0].offsetHeight + (margins !== true ? 0 :
        compute(this, 'marginTop') + compute(this, 'marginBottom') );
  },

  width() {
    return this[0].getBoundingClientRect().width;
  }

});
