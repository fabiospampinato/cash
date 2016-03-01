function encode(e) { return encodeURIComponent(e).replace(/%20/g, '+'); }

fn.extend({

  serialize() {
    var formEl = this[0].elements,
        query = '';

    cash.each(formEl,field => {
      if (field.name && field.type !== 'file' && field.type !== 'reset') {
        if ( field.type === 'select-multiple') {
	        cash.each(field.options, o => {
            if ( o.selected) {
              query += '&' + field.name + '=' + encode(o.value);
            }
          });
        } else if ((field.type !== 'submit' && field.type !== 'button')) {
          query += '&' + field.name + '=' + encode(field.value);
        }
      }
    });

    return query.substr(1);
  },

  val(value) {
    if (value === undefined) {
      return this[0].value;
    } else {
      return this.each(v => v.value = value);
    }
  }

});
