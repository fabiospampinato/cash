function encode(name,value) {
  return '&' + encodeURIComponent(name) + '=' +
    encodeURIComponent(value).replace(/%20/g, '+');
}

function getSelectMultiple_(el) {
  var values = [];
  each(el.options, o => {
    if (o.selected) {
      values.push(o.value);
    }
  });
  return values.length ? values : null;
}

function getSelectSingle_(el) {
  var selectedIndex = el.selectedIndex;
  return selectedIndex >= 0 ? el.options[selectedIndex].value :
    null;
}

function getValue(el) {
  var type = el.type;
  if (!type) {
    return null;
  }
  switch (type.toLowerCase()) {
    case 'select-one':
      return getSelectSingle_(el);
    case 'select-multiple':
      return getSelectMultiple_(el);
    case 'radio':
      return (el.checked) ? el.value : null;
    case 'checkbox':
      return (el.checked) ? el.value : null;
    default:
      return el.value ? el.value : null;
  }
}

fn.extend({

  serialize() {
    var query = '';

    each(this[0].elements || this, el => {
      if (el.disabled || el.tagName === 'FIELDSET') {
        return;
      }
      var name = el.name;
      switch (el.type.toLowerCase()) {
        case 'file':
        case 'reset':
        case 'submit':
        case 'button':
          break;
        case 'select-multiple':
          var values = getValue(el);
          if (values !== null) {
            each(values, value => {
              query += encode(name, value);
            });
          }
          break;
        default:
          var value = getValue(el);
          if (value !== null) {
            query += encode(name, value);
          }
      }
    });

    return query.substr(1);
  },

  val(value) {
    if (value === undefined) {
      return getValue(this[0]);
    } else {
      return this.each(v => v.value = value);
    }
  }

});
