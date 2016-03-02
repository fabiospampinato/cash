fn.extend({

  css(prop, value) {
    if (typeof prop === 'object') {
      return this.each(v => {
        for (var key in prop) {
          if (prop.hasOwnProperty(key)) {
            v.style[key] = prop[key];
          }
        }
      });
    } else if (value) {
      return this.each(v => v.style[prop] = value);
    } else {
      return win.getComputedStyle(this[0], null)[prop];
    }
  }

});
