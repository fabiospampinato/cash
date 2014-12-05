var encode = encodeURIComponent;

fn.extend({

  serialize() {
    var form = this[0],
        query = '',
        field, i, j;

    for (i = form.elements.length - 1; i >= 0; i--) {
      field = form.elements[i];

      if (field.name && field.type !== 'file' && field.type !== 'reset') {
        if (field.type === 'select-multiple') {
          for (j = form.elements[i].options.length - 1; j >= 0; j--) {
            if (field.options[j].selected) {
              query += '&' + field.name + '=' + encode(field.options[j].value).replace(/%20/g, '+');
            }
          }
        } else if ((field.type !== 'submit' && field.type !== 'button')) {
          query += '&' + field.name + '=' + encode(field.value).replace(/%20/g, '+');
        }
      }
    }

    return query.substr(1);
  },

  val(value) {
    if (value === undefined) {
      return this[0].value;
    } else {
      this.each(v => v.value = value);
      return this;
    }
  }

});
