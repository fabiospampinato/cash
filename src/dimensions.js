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
    return this[0].offsetWidth + (margins !== true ? 0 :
        (compute(this, 'margin-left')  || compute(this, 'marginLeft')  || 0) +
        (compute(this, 'margin-right') || compute(this, 'marginRight') || 0) );
  },

  outerHeight(margins) {
    return this[0].offsetHeight + (margins !== true ? 0 :
        (compute(this, 'margin-top') || compute(this, 'marginTop') || 0) +
        (compute(this, 'margin-bottom') || compute(this, 'marginBottom') || 0) );
  },

  width() {
    return this[0].getBoundingClientRect().width;
  }

});
