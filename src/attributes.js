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
    if ( isString(name) ) {
      return ( value === undefined ?
        this[0].getAttribute ? this[0].getAttribute(name) : this[0][name] :
        this.each(v => {
          if ( v.setAttribute ) { v.setAttribute(name, value); }
          else { v[name] = value; }
        })
      );
    }

    for (var key in name) {
      this.attr(key,name[key]);
    }

    return this;
  },

  hasClass(c) {
    var check = false;
    this.each(v => {
      check = hasClass(v,c);
      return !check;
    });
    return check;
  },

  prop(name,value) {

    if ( isString(name) ) {
      return ( value === undefined ?
        this[0][name] :
        this.each(v => { v[name] = value; })
      );
    }

    for (var key in name) {
      this.prop(key,name[key]);
    }

    return this;
  },

  removeAttr(name) {
    return this.each(v => {
      if ( v.removeAttribute ) { v.removeAttribute(name); }
      else { delete v[name]; }
    });
  },

  removeClass(c){
    var classes = c.match(notWhiteMatch);

    return this.each(v => {
      each(classes,c => { removeClass(v,c); });
    });
  },

  removeProp(name){
    return this.each(v => { delete v[name]; });
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
