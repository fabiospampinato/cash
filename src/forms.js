function encode(name,value) {
  return '&' + encodeURIComponent(name) + '=' + encodeURIComponent(value).replace(/%20/g, '+');
}

function isCheckable(field){
  return field.type === 'radio' || field.type === 'checkbox';
}

var formExcludes = ['file','reset','submit','button'];

fn.extend({

  serialize() {
    var formEl = this[0].elements || this,
        query = '';

    each(formEl,field => {
      if (field.name && formExcludes.indexOf(field.type) < 0) {
        if ( field.type === 'select-multiple') {
          each(field.options, o => {
            if ( o.selected ) {
              query += encode(field.name,o.value);
            }
          });
        } else if ( !isCheckable(field) || field.checked )  {
          query += encode(field.name,field.value);
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
