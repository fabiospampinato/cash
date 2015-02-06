fn.extend({

  css(prop, value) {
    if (typeof prop === 'object') {
      this.each(v => {
        for (var key in prop) {
          if (prop.hasOwnProperty(key)) {
            v.style[key] = prop[key];
          }
        }
      });
    } else if (value) {
      this.each(v => v.style[prop] = value);
      return this;
    } else {
      return win.getComputedStyle(this[0], null)[prop];
    }
  }

});
