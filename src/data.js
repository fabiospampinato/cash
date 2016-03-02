fn.extend({

  data(key, value) { // TODO: tear out into module for IE9
    if (!value) {
      return this[0].dataset ? this[0].dataset[key] : cash(this[0]).attr('data-' + key);
    } else {
      return this.each(v => {
        if (v.dataset) {
          v.dataset[key] = value;
        } else {
          cash(v).attr('data-' + key, value);
        }
      });
    }
  },

  removeData(name) { // TODO: tear out into module for IE9
    return this.each(v => {
      if (v.dataset) {
        delete v.dataset[name];
      } else {
        cash(v).removeAttr('data-' + name);
      }
    });
  }

});
