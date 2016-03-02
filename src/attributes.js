var notWhiteMatch = /\S+/g;

function hasClass(v,c) {
  return ( v.classList ?
    v.classList.contains(c) :
    new RegExp('(^| )' + c + '( |$)', 'gi').test(v.className)
  );
}

function addClass(v,c,spacedName){
  if (v.classList) { v.classList.add(c); }
  else if ( spacedName.indexOf(` ${c} `) ) { v.className += ' ' + c; }
}

function removeClass(v,c){
  if (v.classList) { v.classList.remove(c); }
  else { v.className = v.className.replace(c,''); }
}

fn.extend({

  addClass(c){
    var classes = c.match(notWhiteMatch);

    return this.each(v => {
      var spacedName = ` ${v.className} `;
      each(classes,c => { addClass(v,c,spacedName); });
    });
  },

  attr(name, value) {
    if ( !value ) { return this[0].getAttribute(name); }
    return this.each(v => v.setAttribute(name, value));
  },

  hasClass(c) {
    var check = false;
    this.each(v => {
      check = hasClass(v,c);
      return !check;
    });
    return check;
  },

  prop(name) {
    return this[0][name];
  },

  removeAttr(name) {
    return this.each(v => v.removeAttribute(name));
  },

  removeClass(c){
    var classes = c.match(notWhiteMatch);

    return this.each(v => {
      each(classes,c => { removeClass(v,c); });
    });
  },

  toggleClass(c, state){
    if ( state !== undefined ) { return this[state ? 'addClass' : 'removeClass' ](c); }
    var classes = c.match(notWhiteMatch);

    return this.each(v => {
      var spacedName = ` ${v.className} `;
      each(classes,c => {
        if ( hasClass(v,c) ) { removeClass(v,c); } else { addClass(v,c,spacedName); }
      });
    });
  },

});
